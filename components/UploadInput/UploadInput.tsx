'use client';

import {
	Button,
	Image as ChakraImage,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel
} from '@chakra-ui/react';
import { FieldProps } from 'formik';
import { useMemo, useRef } from 'react';

import { TrackClickEvent } from '@/components';
import { Upload } from '@/icons';
import { createClient } from '@/lib/supabase/client';

import { ImageFallback } from './components';

export default function UploadInput({
	label,
	buttonLabel,
	acceptedFileTypes,
	fieldProps
}: {
	label: string;
	buttonLabel: string;
	acceptedFileTypes: string;
	fieldProps: FieldProps;
}) {
	const inputRef = useRef<HTMLInputElement>(null);
	const supabaseClient = createClient();

	const image = useMemo(() => {
		return typeof fieldProps.field.value === 'string'
			? supabaseClient.storage.from('map-images').getPublicUrl(fieldProps.field.value).data
					.publicUrl
			: URL.createObjectURL(fieldProps.field.value);
	}, [supabaseClient.storage, fieldProps.field.value]);

	return (
		<FormControl
			isInvalid={
				(fieldProps.form.errors[fieldProps.field.name] &&
					fieldProps.form.touched[fieldProps.field.name]) as boolean
			}>
			<FormLabel>{label}</FormLabel>
			<input
				type="file"
				accept={acceptedFileTypes}
				ref={inputRef}
				onChange={(event) => {
					if (
						!event ||
						!event.currentTarget ||
						!event.currentTarget.files ||
						!event.currentTarget.files[0]
					) {
						fieldProps.form.setFieldValue(fieldProps.field.name, null);
						return;
					}

					var fr = new FileReader();
					fr.onload = function () {
						var img = new Image();

						img.onload = function () {
							fieldProps.form.setFieldValue('mapImageData', {
								width: (this as unknown as { height: number; width: number }).width || 0,
								height: (this as unknown as { height: number; width: number }).height || 0
							});
						};

						img.src = fr.result as string;
					};
					fr.readAsDataURL(event.currentTarget.files[0]);

					fieldProps.form.setFieldValue(fieldProps.field.name, event.currentTarget.files[0]);
				}}
				style={{ display: 'none' }}
			/>
			<Flex align="flex-start" gap="6">
				{fieldProps.field.value && (
					<ChakraImage
						borderRadius="md"
						alt="Bild der Karte"
						boxSize="125px"
						fallback={<ImageFallback height="125px" width="125px" />}
						src={image}
					/>
				)}
				<TrackClickEvent event={{ name: 'UPLOAD_BUTTON_CLICK' }}>
					<Button
						variant="outline"
						leftIcon={<Upload boxSize="5" />}
						onClick={() => {
							fieldProps.form.setTouched({ [fieldProps.field.name]: true });
							inputRef?.current?.click();
						}}>
						{buttonLabel}
					</Button>
				</TrackClickEvent>
			</Flex>
			<FormErrorMessage>{fieldProps.form.errors[fieldProps.field.name] as string}</FormErrorMessage>
		</FormControl>
	);
}
