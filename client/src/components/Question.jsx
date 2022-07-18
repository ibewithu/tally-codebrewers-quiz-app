import React from "react";
import {
    Button,
    Checkbox,
    FormGroup,
    InputGroup,
    TextArea,
    Intent,
} from "@blueprintjs/core";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import style from "./styles.module.css";

function Question({ key1, deleteQuestion, data}) {
    // const [quesContent, setquesContent] = React.useState("");
    // const [checkboxstate, setCheckboxstate] = React.useState(
        // new Array(4).fill(false)
    // );
    // const handleChange = (e) => {
    //     setquesContent(e.target.value);
    // };
    // const [options, setOptions] = React.useState(new Array(4).fill(""));

    const handleOptions = (e, id1) => {
        const updatedOptions = options.map((val, id) => {
            if (id === id1) return e.target.value;
            else return val;
        });
        setOptions(updatedOptions);
    };
    const handleCheckbox = (id1) => {
        const updatedState = data.checkboxstate.map((val, id) => {
            if (id === id1) return !val;
            else return val;
        });
        setCheckboxstate(updatedState);
    };

    

    return (
        <div>
            <FormGroup className={style.form}>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {"Q" + (key1 + 1)}
                </div>
                <Button className={style.delete} onClick={() => deleteQuestion(key1)}>
                    delete
                </Button>
                <TextArea
                    growVertically={true}
                    large={true}
                    intent={Intent.PRIMARY}
                    onChange={handleChange}
                    value={data.quesContent}
                    className={style.text_area}
                />
                <ol>
                    <li>
                        <Checkbox
                            checked={data.checkboxstate[0]}
                            onChange={() => handleCheckbox(0)}
                        />
                        <InputGroup
                            key={0}
                            type="text"
                            value={options[0]}
                            placeholder="Enter options"
                            onChange={(e) => handleOptions(e, 0)}
                        />
                    </li>
                    <li>
                        <Checkbox
                            checked={checkboxstate[1]}
                            onChange={() => handleCheckbox(1)}
                        />
                        <InputGroup
                            key={1}
                            type="text"
                            value={options[1]}
                            onChange={(e) => handleOptions(e, 1)}
                            placeholder="Enter options"
                        />
                    </li>
                    <li>
                        <Checkbox
                            checked={checkboxstate[2]}
                            onChange={() => handleCheckbox(2)}
                        />
                        <InputGroup
                            key={2}
                            type="text"
                            value={options[2]}
                            onChange={(e) => handleOptions(e, 2)}
                            placeholder="Enter options"
                        />
                    </li>
                    <li>
                        <Checkbox
                            checked={checkboxstate[3]}
                            onChange={() => handleCheckbox(3)}
                        />
                        <InputGroup
                            key={3}
                            type="text"
                            value={options[3]}
                            onChange={(e) => handleOptions(e, 3)}
                            placeholder="Enter options"
                        />
                    </li>
                </ol>
            </FormGroup>
        </div>
    );
}

export default Question;
