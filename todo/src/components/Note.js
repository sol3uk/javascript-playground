export const Note = (props) => (
    <>
      {/* this is a fragment, disappears on render, can be used instead of div */}
      <h1>Note Id: {props.note.id}</h1>
      <h1>Message: {props.note.message}</h1>
    </>
  );