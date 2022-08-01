import { useSelector } from "react-redux";

export default function RenderList() {
  const {loading, error, list} = useSelector(state => state.remember.inputList);
  return(
    <div>
      {
        error && <strong>Retry!</strong>
      }
      {
        loading
          ? <span>Loading...</span>
          :
          <>
            {list.map((value, index) => {
              return (
                <p key={index}>{value}</p>
              );
            })}
          </>
      }
    </div>
  )
}
