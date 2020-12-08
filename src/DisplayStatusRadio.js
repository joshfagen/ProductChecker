import React from 'react';


const DisplayStatusRadio=({onHandleDisplayOptionChange})=>{
  return (
    <div id = "statusDisplayRadioDiv">
    <label >Select Status:</label>
    <form>

  <fieldset id="statusDisplayRadio" className="fieldset">

  <label className="statuschooserLabel">
    <input
     type="radio"
       name="status"
        value="0"
        onChange={onHandleDisplayOptionChange}
        >     
        </input>
        Not Reviewed</label>

    <label className="statuschooserLabel">
    <input
     type="radio"
       name="status"
        value="1"
        onChange={onHandleDisplayOptionChange}
        >     
        </input>
        ✔️</label>

        <label className="statuschooserLabel">
    <input
     type="radio"
       name="status"
        value="2"

        onChange={onHandleDisplayOptionChange}
        >     
        </input>
        ❌</label>
        <label id="qLabel">

    <input
     type="radio"
       name="status"
        value="3"

        onChange={onHandleDisplayOptionChange}
        >     
        </input>
        ❔</label>
        </fieldset>
        </form>
    </div>

  );
}

export default DisplayStatusRadio;