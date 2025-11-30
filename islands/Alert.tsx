import { AlertTriangle, CheckCircle2 } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";

interface AlertProps {
  message: string;
  success: boolean;
  timeout?: number; // in milliseconds, defaults to 5000
}

export default function Alert({ message, success, timeout = 5000 }: AlertProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  if (!visible) return null;

  return success ? (
    <div
      role="alert"
      class="border-2 bg-green-100 p-4 text-green-900 shadow-[4px_4px_0_0] my-6"
    >
      <div class="flex items-start gap-3">
        <CheckCircle2 size={16} class="mt-0.5 mb-1 size-4" />
        <strong class="block flex-1 leading-tight font-semibold">
          {message}
        </strong>
      </div>
    </div>
  ) : (
    <div
      role="alert"
      class="border-2 bg-red-100 p-4 text-red-900 shadow-[4px_4px_0_0] my-6"
    >
      <div class="flex items-start gap-3">
        <AlertTriangle size={16} class="mt-0.5" />
        <strong class="block flex-1 leading-tight font-semibold">
          {message}
        </strong>
      </div>
    </div>
  );
}
