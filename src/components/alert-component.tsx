// src/components/AlertComponent.tsx

import {Alert, AlertTitle, AlertDescription} from "@/components/ui/alert"; // Ajuste o caminho conforme necessário
import {AlertTriangle} from "lucide-react"; // Certifique-se de que o ícone está disponível

interface AlertComponentProps {
    title: string; // O título do alerta
    description: string; // A descrição do alerta

}

const AlertComponent: React.FC<AlertComponentProps> = ({ title, description}) => {
    return (
        <Alert variant="default" >
            <AlertTriangle className="size-4"/>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                <p>{description}</p>
            </AlertDescription>
        </Alert>
    );
};

export default AlertComponent;
