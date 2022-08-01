import { addToInputList } from "./rememberSlice";
import InputContainer from "./inputContainer";
import RenderList from "./renderList";

export default function SelfList() {
  
  return(
    <div className="selfList">
      <h1>Create your List.</h1>
      <ul className="rules">
        <li>Maximum 10 words are allowed.</li>
        <li>Minimum 5 words are allowed.</li>
        <li>Duplicate words are not allowed.</li>
        <li>Only smallcase letters are allowed. (eg. a-z)</li>
      </ul>
      <InputContainer action={addToInputList}/>
      <RenderList />
    </div>
  );
}

