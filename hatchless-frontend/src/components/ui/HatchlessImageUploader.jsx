import { useState, useEffect, useCallback } from 'react';
import { Group, Title, Text, Card, Image, ActionIcon, Alert, SimpleGrid } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconTrash } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

const addFileId = (file) => ({
  file,
  id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
  previewUrl: URL.createObjectURL(file),
});

const HatchlessImageUploader = ({ onFilesSelect, initialFiles = [], maxFileCount = 5 }) => {
  const [files, setFiles] = useState(initialFiles.map(addFileId));
  const [error, setError] = useState(null);
  const MAX_FILE_SIZE = 5 * 1024 ** 2;

  useEffect(() => {
    return () => {
      files.forEach(f => URL.revokeObjectURL(f.previewUrl));
    };
  }, []);

  useEffect(() => {
    onFilesSelect(files.map(f => f.file));
  }, [files]);


  const removeFile = useCallback((fileIdToRemove) => {
    setFiles(prevFiles => {
      const fileToRemove = prevFiles.find(f => f.id === fileIdToRemove);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prevFiles.filter(f => f.id !== fileIdToRemove);
    });
  }, []);


  const handleDrop = (newRawFiles) => {
    const validFiles = [];
    const rejectedFileNames = [];

    newRawFiles.forEach(file => {
      if (!file.type.startsWith('image/')) {
        rejectedFileNames.push(`${file.name} (Not an image)`);
      } else if (file.size > MAX_FILE_SIZE) {
        rejectedFileNames.push(`${file.name} (Exceeds 5MB)`);
      } else {
        validFiles.push(file);
      }
    });

    if (rejectedFileNames.length > 0) {
      setError(`Rejected: ${rejectedFileNames.join(', ')}`);
    }

    if (validFiles.length > 0) {
      const newStructuredFiles = validFiles.map(addFileId);
      setFiles(prevFiles => [...prevFiles, ...newStructuredFiles]);
      if (rejectedFileNames.length === 0) {
        setError(null);
      }
    }
  };

  const previews = files.map(f => (
    <Card key={f.id} padding="xs" radius="md" withBorder>
      <Card.Section>
        <Image
          src={f.previewUrl}
          height={120}
          alt={`Upload preview for ${f.file.name}`}
        />
      </Card.Section>
      <Group justify="space-between" mt="sm">
        <Text size="sm" weight={500} truncate title={f.file.name}>
          {f.file.name}
        </Text>
        <ActionIcon
          color="red"
          variant="subtle"
          onClick={() => removeFile(f.id)}
          aria-label={`Remove ${f.file.name}`}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
      <Text size="xs" c="dimmed">
        {(f.file.size / 1024 / 1024).toFixed(2)} MB
      </Text>
    </Card>
  ));


  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={5}>Upload Images</Title>

      {files.length < maxFileCount && <Dropzone
        onDrop={handleDrop}
        onReject={(rejectedFiles) => setError(`Rejected files: ${rejectedFiles.length} files exceeded limit or type.`)}
        maxSize={MAX_FILE_SIZE}
        accept={IMAGE_MIME_TYPE}
        multiple={true}
        disabled={files.length >= maxFileCount}
      >
        <Group justify="center" gap="xl" mih={150} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach multiple images (max 5MB each)
            </Text>
          </div>
        </Group>
      </Dropzone>}

      {error && (
        <Alert color="red" title="Upload Error" withCloseButton onClose={() => setError(null)} mt="md">
          {error}
        </Alert>
      )}

      {previews.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <Text weight={500} size="sm" mb="xs">
            {previews.length} Image(s) Selected:
          </Text>
          <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
            {previews}
          </SimpleGrid>
        </div>
      )}
    </Card>
  );
};

export default HatchlessImageUploader;