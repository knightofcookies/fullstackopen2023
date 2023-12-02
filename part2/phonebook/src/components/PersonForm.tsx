import { ChangeEvent } from "react";

type PersonFormProps = {
    newName: string;
    newNumber: string;
    handleNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleNumberChange: (event: ChangeEvent<HTMLInputElement>) => void;
    addPerson: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const PersonForm = (props: PersonFormProps) => {
    return (
        <form>
            <div>
                name: <input value={props.newName} onChange={props.handleNameChange} />
                phone: <input value={props.newNumber} onChange={props.handleNumberChange} />
            </div>
            <div>
                <button type="submit" onClick={props.addPerson}>add</button>
            </div>
        </form>

    );
};

export default PersonForm;
export type { PersonFormProps };