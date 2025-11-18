export interface ContactFormProps {
  vehicleId: string;
  vehicleModel: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}
