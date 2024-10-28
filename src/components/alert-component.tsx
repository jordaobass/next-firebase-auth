import {Alert, AlertTitle, AlertDescription} from "@/components/ui/alert"; // Ajuste o caminho conforme necessário
import {AlertTriangle} from "lucide-react";

interface AlertComponentProps {
    title: string;
    description: string;

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
