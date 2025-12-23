# GPX Upload and Display Feature - Implementation Plan

## Overview

Replace static map images with interactive GPX-based maps using Leaflet. Users will upload GPX files which will be displayed as interactive maps and be downloadable.

## Current Architecture Analysis

### Existing Implementation

- **Database**: `touren` table has:
  - `mapUrl` (text) - Link to Schweiz Mobil map
  - `image_data` (JSON) - Contains `{path, width, height}` for uploaded map images
- **Storage**: `map-images` bucket stores tour map images named `{tourId}.{extension}`
- **Components**:
  - `TourForm.tsx` - Admin form for creating/editing tours
  - `UploadInput.tsx` - Generic file upload component for images
  - `TourView.tsx` - Public tour display component
- **Types**:
  - `TourFields` type in `/types/TourFields.types.ts`
  - `Tour` type derives from database schema

### Current Flow

1. Admin uploads image via `UploadInput` component
2. Image saved to Supabase Storage `map-images` bucket
3. Image metadata (path, dimensions) stored in `image_data` JSON column
4. `TourView` displays image using Next.js `Image` component with `AspectRatio`

## Implementation Plan

### Phase 1: Database Schema Changes

**1.1 Add GPX Column to Database**

```sql
-- Migration file: add_gpx_support.sql
ALTER TABLE touren
ADD COLUMN gpx_file_path TEXT;

COMMENT ON COLUMN touren.gpx_file_path IS 'Path to GPX file in Supabase Storage';
```

**1.2 Update TypeScript Types**

- Run `pnpm types` after schema change to regenerate `/types/Database.types.ts`
- Update `/types/TourFields.types.ts`:

```typescript
export type TourFields = {
	name: string;
	description: string;
	route: string;
	mapLink: string;
	mapImage: File | string; // Make optional in validation
	mapImageData: {
		width: number;
		height: number;
	};
	gpxFile?: File | string; // New field
	distance: string;
	ascent: string;
	descent: string;
	duration: string;
	start: string;
	end: string;
	pause: string;
};
```

**1.3 Create GPX Files Storage Bucket**

- Go to Supabase Dashboard → Storage
- Create new bucket: `gpx-files`
- Set to public access for downloads
- File naming: `{tourId}.gpx`

### Phase 2: Install Dependencies

```bash
pnpm add leaflet react-leaflet gpx-parser-builder
pnpm add -D @types/leaflet
```

**Libraries:**

- `leaflet@^1.9.4` - Core mapping library
- `react-leaflet@^4.2.1` - React wrapper for Leaflet
- `gpx-parser-builder@^1.0.0` - Parse GPX files to extract track data
- `@types/leaflet` - TypeScript definitions

### Phase 3: Create GPX Upload Component

**3.1 Create `/components/GpxUploadInput/GpxUploadInput.tsx`**

Similar structure to `UploadInput.tsx` but:

- Accept `.gpx` files only (`accept=".gpx,application/gpx+xml"`)
- No image preview (show file name instead)
- Parse GPX on upload to validate format
- Store file in Formik state

```typescript
// Key differences from UploadInput:
// - acceptedFileTypes: ".gpx,application/gpx+xml"
// - No image dimensions calculation
// - Validate GPX format using gpx-parser-builder
// - Show file name and size instead of preview
```

**3.2 Create `/components/GpxUploadInput/index.ts`**

```typescript
export { default } from './GpxUploadInput';
```

**3.3 Update `/components/index.ts`**

```typescript
export { default as GpxUploadInput } from './GpxUploadInput';
```

### Phase 4: Create Leaflet Map Component

**4.1 Create `/components/LeafletMap/LeafletMap.tsx`**

This is a client component that:

- Uses `react-leaflet` components (`MapContainer`, `TileLayer`, `Polyline`)
- Accepts GPX file path as prop
- Fetches GPX from Supabase Storage
- Parses GPX and extracts track coordinates
- Displays track on map with auto-fit bounds
- Uses OpenStreetMap tiles (or Swiss Topo if preferred)

```typescript
'use client';

import { parseGpx } from 'gpx-parser-builder';
import { LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';

// Component structure:
// 1. Fetch GPX file from Supabase Storage
// 2. Parse GPX to get track points
// 3. Convert to LatLng coordinates
// 4. Calculate bounds for auto-zoom
// 5. Render map with track overlay
```

**Key considerations:**

- Leaflet CSS must be imported
- Map container needs explicit height
- Handle loading/error states
- Calculate bounds from GPX track for proper zoom level
- Style track with appropriate color/weight

**4.2 Create `/components/LeafletMap/index.ts`**

**4.3 Add Leaflet CSS to global styles**

- Import in `/app/layout.tsx` or create separate CSS file

### Phase 5: Add GPX Download Functionality

**5.1 Create `/components/GpxDownloadButton/GpxDownloadButton.tsx`**

```typescript
'use client';

import { Button, Icon } from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';

import { createClient } from '@/lib/supabase/client';

// Component that:
// 1. Takes gpxFilePath as prop
// 2. Generates download URL from Supabase Storage
// 3. Triggers browser download when clicked
```

**5.2 Create index.ts and export**

### Phase 6: Update Tour Form

**6.1 Update `/app/admin/components/TourForm/TourForm.tsx`**

Changes:

- Add `gpxFile` field to Formik
- Add `GpxUploadInput` component to form
- Update validation schema:
  - Make `mapImage` optional when `gpxFile` is provided
  - At least one of `mapImage` or `gpxFile` must be present

```typescript
validationSchema={object({
	// ... existing fields
	mapImage: string().nullable().when('gpxFile', {
		is: (val: unknown) => !val,
		then: (schema) => schema.required('Bild oder GPX wird benötigt'),
		otherwise: (schema) => schema.nullable()
	}),
	gpxFile: string().nullable()
})}
```

- Add GPX upload field in form JSX (after mapImage field):

```tsx
<FormikField name="gpxFile">
	{(fieldProps: FieldProps) => (
		<GpxUploadInput
			label="GPX Datei (optional)"
			buttonLabel="GPX hochladen..."
			fieldProps={fieldProps}
		/>
	)}
</FormikField>
```

**6.2 Update `/app/admin/components/TourForm/defaultValues.ts`**

```typescript
export const defaultValues: TourFields = {
	// ... existing fields
	gpxFile: ''
};
```

### Phase 7: Update Tour Save Logic

**7.1 Update `/app/admin/components/NewTourSection.tsx`**

Modify `saveNewTour` function:

1. Create tour record (existing logic)
2. If `mapImage` exists, upload image (existing logic)
3. **NEW**: If `gpxFile` exists, upload GPX:

```typescript
if (gpxFile && gpxFile instanceof File) {
	const { data: gpxData, error: gpxUploadError } = await supabaseClient.storage
		.from('gpx-files')
		.upload(`${data[0].id}.gpx`, gpxFile, { upsert: true });

	if (!gpxUploadError) {
		await supabaseClient
			.from('touren')
			.update({ gpx_file_path: gpxData.path })
			.eq('id', data[0].id);
	}
}
```

**7.2 Update Edit Tour Logic**

Find and update the edit tour component (likely in `/app/admin/components/TourInfo/components/TourOperations/components/EditTour.tsx`):

- Add similar GPX upload logic to update flow
- Handle case where GPX is being added to existing tour
- Handle case where GPX is being replaced

### Phase 8: Update Tour Display

**8.1 Update `/components/TourView/TourView.tsx`**

Replace the current `AspectRatio` + `Image` section with conditional rendering:

```tsx
{
	tour.gpx_file_path ? (
		<>
			<GpxDownloadButton gpxFilePath={tour.gpx_file_path} />
			<Box height="500px" width="100%" my="4">
				<LeafletMap gpxFilePath={tour.gpx_file_path} />
			</Box>
		</>
	) : tour.image_data ? (
		<>
			<Link href={tour.mapUrl} display="block" my="2" target="_blank" color="green.700">
				Auf Schweiz Mobil anschauen{' '}
				<Icon mx="2px" boxSize="4">
					<FiExternalLink />
				</Icon>
			</Link>
			<AspectRatio
				maxW="736px"
				ratio={tour.image_data.width / tour.image_data.height}
				borderRadius="sm">
				<Image
					src={
						supabase.storage.from('map-images').getPublicUrl(tour.image_data.path).data.publicUrl
					}
					fill
					sizes="(min-width: 768px) 736px, 100vw"
					alt="Bild der Karte"
				/>
			</AspectRatio>
		</>
	) : null;
}
```

**8.2 Update other tour display locations**

- Check `/app/page.tsx` (homepage)
- Check `/app/tour/[id]/page.tsx` (individual tour page)
- Check `/app/alle-touren/page.tsx` (all tours listing)
- Apply similar conditional rendering where maps are displayed

### Phase 9: Testing & Validation

**9.1 Create Test Data**

- Find sample GPX files for testing
- Test with various GPX formats (tracks, routes, waypoints)

**9.2 Test Scenarios**

1. Create new tour with GPX only
2. Create new tour with image only (backward compatibility)
3. Create new tour with both GPX and image
4. Edit existing tour to add GPX
5. Edit tour to replace GPX
6. Download GPX file
7. View GPX map on different screen sizes
8. Test with invalid GPX files
9. Test GPX map rendering with various track complexities

**9.3 Browser Testing**

- Test Leaflet map in Chrome, Firefox, Safari
- Test mobile responsiveness
- Test print view (might need special handling)

### Phase 10: Optional Enhancements

**10.1 Map Customization**

- Add map controls (zoom, layers)
- Switch to Swiss Topo tiles for better local maps
- Add elevation profile display (extract from GPX)
- Show start/end markers on map

**10.2 GPX Metadata Display**

- Extract and display: total distance, elevation gain/loss
- Show waypoints if present in GPX
- Display track statistics

**10.3 Print Optimization**

- Update `/app/print/` pages to handle GPX maps
- Consider static map image generation for print views

## File Structure Summary

```
/components/
├── GpxUploadInput/
│   ├── GpxUploadInput.tsx (new)
│   └── index.ts (new)
├── LeafletMap/
│   ├── LeafletMap.tsx (new)
│   └── index.ts (new)
├── GpxDownloadButton/
│   ├── GpxDownloadButton.tsx (new)
│   └── index.ts (new)
├── TourView/
│   └── TourView.tsx (modified)
└── index.ts (modified - add exports)

/app/admin/components/
├── TourForm/
│   ├── TourForm.tsx (modified)
│   └── defaultValues.ts (modified)
├── NewTourSection.tsx (modified)
└── TourInfo/components/TourOperations/components/
    └── EditTour.tsx (modified)

/types/
├── Database.types.ts (regenerated after schema change)
└── TourFields.types.ts (modified)

/supabase/
└── migrations/
    └── add_gpx_support.sql (new)
```

## Open Questions to Address Before Implementation

1. **Backward Compatibility**: How to handle existing tours?
   - Option A: Keep image display for tours without GPX (recommended)
   - Option B: Require GPX upload for all tours

2. **Priority When Both Exist**: If tour has both GPX and image:
   - Option A: Always show GPX map (recommended)
   - Option B: Show image with toggle to GPX
   - Option C: Show both

3. **Map Tile Provider**:
   - Option A: OpenStreetMap (free, good quality)
   - Option B: Swiss Topo (better for Switzerland, may require API key)
   - Option C: Mapbox (requires API key)

4. **Required Fields**:
   - Should GPX be optional or required for new tours?
   - Current plan: Optional, but at least one of image or GPX required

5. **Schweiz Mobil Link**:
   - Keep `mapUrl` field for Schweiz Mobil link even with GPX?
   - Recommended: Yes, keep as reference/alternative

6. **GPX File Size Limits**:
   - Set max file size for uploads?
   - Recommended: 5MB limit

## Migration Strategy

### For Existing Tours

- No action required - they continue showing images
- Admins can optionally add GPX files to existing tours via edit

### For New Tours

- GPX upload available immediately
- Image upload remains available for backward compatibility
- Form validation ensures at least one is provided

## Dependencies Checklist

- [ ] `leaflet@^1.9.4`
- [ ] `react-leaflet@^4.2.1`
- [ ] `gpx-parser-builder@^1.0.0`
- [ ] `@types/leaflet`

## Estimated Effort

- Phase 1 (Database): 30 min
- Phase 2 (Dependencies): 10 min
- Phase 3 (GPX Upload): 1-2 hours
- Phase 4 (Leaflet Map): 2-3 hours
- Phase 5 (Download): 30 min
- Phase 6 (Form Updates): 1 hour
- Phase 7 (Save Logic): 1-2 hours
- Phase 8 (Display Updates): 1-2 hours
- Phase 9 (Testing): 2-3 hours

**Total**: ~10-15 hours

## Success Criteria

- [ ] Admins can upload GPX files when creating tours
- [ ] Admins can upload GPX files when editing tours
- [ ] GPX files are stored in Supabase Storage
- [ ] Interactive map displays on tour pages when GPX exists
- [ ] Users can download GPX files
- [ ] Existing tours with images continue to work
- [ ] Form validation prevents tours without map/GPX
- [ ] Map is responsive and works on mobile
- [ ] No TypeScript errors
- [ ] All existing tests pass
