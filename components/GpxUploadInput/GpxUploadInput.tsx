'use client';

import { Box, Button, Field, Flex, Icon, Text } from '@chakra-ui/react';
import { FieldProps } from 'formik';
import { useRef, useState } from 'react';
import { FiFile, FiUpload } from 'react-icons/fi';

export default function GpxUploadInput({
	label,
	buttonLabel,
	fieldProps
}: {
	label: string;
	buttonLabel: string;
	fieldProps: FieldProps;
}) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState<string>('');
	const [fileSize, setFileSize] = useState<string>('');

	const formatFileSize = (bytes: number): string => {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	};

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (
			!event ||
			!event.currentTarget ||
			!event.currentTarget.files ||
			!event.currentTarget.files[0]
		) {
			fieldProps.form.setFieldValue(fieldProps.field.name, null);
			setFileName('');
			setFileSize('');
			return;
		}

		const file = event.currentTarget.files[0];

		// Validate file extension
		if (!file.name.toLowerCase().endsWith('.gpx')) {
			fieldProps.form.setFieldError(fieldProps.field.name, 'Bitte nur GPX-Dateien hochladen');
			return;
		}

		// Validate file size (5MB limit)
		if (file.size > 5 * 1024 * 1024) {
			fieldProps.form.setFieldError(fieldProps.field.name, 'Datei ist zu groß (max. 5MB)');
			return;
		}

		// Basic GPX format validation
		try {
			const text = await file.text();
			if (!text.includes('<gpx') || !text.includes('</gpx>')) {
				fieldProps.form.setFieldError(fieldProps.field.name, 'Ungültige GPX-Datei');
				return;
			}
		} catch (error) {
			fieldProps.form.setFieldError(fieldProps.field.name, 'Fehler beim Lesen der Datei');
			return;
		}

		setFileName(file.name);
		setFileSize(formatFileSize(file.size));
		fieldProps.form.setFieldValue(fieldProps.field.name, file);
	};

	return (
		<Field.Root
			invalid={
				(fieldProps.form.errors[fieldProps.field.name] &&
					fieldProps.form.touched[fieldProps.field.name]) as boolean
			}>
			<Field.Label>{label}</Field.Label>
			<input
				type="file"
				accept=".gpx,application/gpx+xml"
				ref={inputRef}
				onChange={handleFileChange}
				style={{ display: 'none' }}
			/>
			<Flex align="flex-start" gap="6">
				{fieldProps.field.value && fileName && (
					<Box borderRadius="md" border="1px solid" borderColor="gray.200" p="4" minW="200px">
						<Flex align="center" gap="2" mb="1">
							<Icon boxSize="5" color="green.600">
								<FiFile />
							</Icon>
							<Text fontSize="sm" fontWeight="medium">
								{fileName}
							</Text>
						</Flex>
						<Text fontSize="xs" color="gray.600">
							{fileSize}
						</Text>
					</Box>
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
