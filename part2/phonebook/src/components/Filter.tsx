import { ChangeEvent } from "react";

type FilterProps = {
    nameQuery: string;
    handleNameQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
    displayResults: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Filter = (props: FilterProps) => {
    return (
        <form>
        <div>
          <input type="text" value={props.nameQuery} onChange={props.handleNameQueryChange}/>
        </div>
        <div>
          <button type="submit" onClick={props.displayResults}>search</button>
        </div>
      </form>
    );
};

export default Filter;
export type { FilterProps };