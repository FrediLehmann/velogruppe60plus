'use client';

import { Button, Image as ChakraImage, Field, Flex, Icon } from '@chakra-ui/react';
import { FieldProps } from 'formik';
import { useMemo, useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';

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
	const [imageError, setImageError] = useState(false);

	const image = useMemo(() => {
		setImageError(false);
		return typeof fieldProps.field.value === 'string'
			? supabaseClient.storage.from('map-images').getPublicUrl(fieldProps.field.value).data
					.publicUrl
			: URL.createObjectURL(fieldProps.field.value);
	}, [supabaseClient.storage, fieldProps.field.value]);

	return (
		<Field.Root
			invalid={
				(fieldProps.form.errors[fieldProps.field.name] &&
					fieldProps.form.touched[fieldProps.field.name]) as boolean
			}>
			<Field.Label>{label}</Field.Label>
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

					const fr = new FileReader();
					fr.onload = function () {
						const img = new Image();

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
					<>
						{imageError ? (
							<ImageFallback height="125px" width="125px" />
						) : (
							<ChakraImage
								borderRadius="md"
								alt="Bild der Karte"
								boxSize="125px"
								src={image}
								onError={() => setImageError(true)}
							/>
						)}
					</>
				)}
				<Button
					variant="outline"
					onClick={() => {
						fieldProps.form.setTouched({ [fieldProps.field.name]: true });
						inputRef?.current?.click();
					}}>
					<Icon boxSize="5">
						<FiUpload />
					</Icon>
					{buttonLabel}
				</Button>
			</Flex>
			<Field.ErrorText>{fieldProps.form.errors[fieldProps.field.name] as string}</Field.ErrorText>
		</Field.Root>
	);
}
