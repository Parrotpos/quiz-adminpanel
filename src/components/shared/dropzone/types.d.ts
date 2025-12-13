interface ImageDropzoneProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  label?: string;
  error?: string;
}
