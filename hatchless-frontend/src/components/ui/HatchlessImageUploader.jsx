import { useState, useEffect } from 'react';
import { Group, Text, Card, Image, ActionIcon, Alert, SimpleGrid } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconTrash } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

const HatchlessImageUploader = ({ onFileSelect, initialFile }) => {
  const file = initialFile;
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      if (file) {
        const url = URL.createObjectURL(file);
        URL.revokeObjectURL(url);
      }
    };
  }, [file]);

  const removeSelectedFile = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      URL.revokeObjectURL(url);
    }
    onFileSelect(null);
  };

  const handleDrop = (newFiles) => {
    if (newFiles.length > 0) {
      onFileSelect(newFiles[0]);
      setError(null);
    }
  };

  const preview = file ? (
    <Card padding="xs" radius="md" withBorder>
      <Card.Section>
        <Image
          src={URL.createObjectURL(file)}
          height={120}
          alt={`Upload preview`}
        />
      </Card.Section>
      <Group position="apart" mt="sm">
        <Text size="sm" weight={500} truncate>
          {file.name}
        </Text>
        <ActionIcon
          color="red"
          variant="subtle"
          onClick={removeSelectedFile}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
      <Text size="xs" color="dimmed">
        {(file.size / 1024 / 1024).toFixed(2)} MB
      </Text>
    </Card>
  ) : null;

  const hideDropzone = !!file;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Dropzone
        onDrop={handleDrop}
        onReject={(rejectedFiles) => setError(`Rejected files: ${rejectedFiles.map(f => f.name).join(', ')}`)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple={false}
        style={hideDropzone ? { display: 'none' } : {}}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
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
              Drag an image here or click to select a file
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach a single image (max 5mb)
            </Text>
          </div>
        </Group>
      </Dropzone>

      {error && (
        <Alert color="red" title="Error" withCloseButton onClose={() => setError(null)} mt="md">
          {error}
        </Alert>
      )}

      {preview && (
        <div style={{ marginTop: '1rem' }}>
          <Text weight={500} size="sm" mb="xs">
            Selected Image:
          </Text>
          <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 2 }]}>
            {preview}
          </SimpleGrid>
        </div>
      )}
    </Card>
  );
};

export default HatchlessImageUploader;