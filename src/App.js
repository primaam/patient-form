import React from "react";
import "./App.css";
import Loader from "./components/loader/Loader";

let defaultForm = {
    patientName: "",
    patientId: "",
    date: "",
    treatDesc: [],
    medPrescribed: [],
    cost: 0,
};

function App() {
    const [patientNameForm, setPatientNameForm] = React.useState("");
    const [patientIdForm, setPatientIdForm] = React.useState("");
    const [dateForm, setDateForm] = React.useState("");
    const [treatDescForm, setTreatDescForm] = React.useState([]);
    const [medPrescribedForm, setMedPrescribedForm] = React.useState();
    const [costForm, setCostForm] = React.useState("");

    const [formPoints, setFormPoints] = React.useState(defaultForm);

    const treatOpt = [
        { id: 1, value: "option 1" },
        { id: 2, value: "option 2" },
        { id: 3, value: "option 3" },
    ];
    const presribedOpt = [
        { id: 1, value: "option 1" },
        { id: 2, value: "option 2" },
        { id: 3, value: "option 3" },
    ];

    console.log(treatDescForm);

    const changeNumber = (num, prefix) => {
        let res = num.replace(/\D/g, "").toString();

        return setCostForm(res);
    };

    var expanded = false;

    function showCheckboxes() {
        var checkboxes = document.getElementById("checkboxes");
        if (!expanded) {
            checkboxes.style.display = "block";
            expanded = true;
        } else {
            checkboxes.style.display = "none";
            expanded = false;
        }
    }

    return (
        <div className="App">
            <div className="formlayout">
                <div className="form">
                    <label>Patient ID</label>
                    <input
                        type="text"
                        value={patientIdForm}
                        onChange={(val) => setPatientIdForm(val.target.value)}
                    />
                </div>
                <div className="form">
                    <label>Patient Name</label>
                    <input
                        type="text"
                        value={patientIdForm}
                        onChange={(val) => setPatientIdForm(val.target.value)}
                    />
                </div>
                <div className="form">
                    <label>Date of Treatment</label>
                    <input
                        type="date"
                        value={patientIdForm}
                        onChange={(val) => setPatientIdForm(val.target.value)}
                    />
                </div>
                <div className="form">
                    <label>Treatment Description</label>
                    <div className="multiselect">
                        <div className="selectBox" onClick={showCheckboxes}>
                            <select>
                                <option>Select an option</option>
                            </select>
                            <div className="overSelect"></div>
                        </div>
                        <div id="checkboxes">
                            {treatOpt.map((item, i) => {
                                return (
                                    <label key={i}>
                                        <input
                                            onClick={() => {
                                                if (treatDescForm.includes(item.value) === true) {
                                                    let filter = treatDescForm.filter((opt) => {
                                                        return opt !== item.value;
                                                    });
                                                    setTreatDescForm(filter);
                                                } else {
                                                    setTreatDescForm([
                                                        ...treatDescForm,
                                                        item.value,
                                                    ]);
                                                }
                                            }}
                                            type="checkbox"
                                            id={`${item.id}`}
                                        />
                                        {item.value}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    <select multiple>
                        <option value={"test 1"}>test</option>
                        <option value={"test 2"}>test 2</option>
                        <option value={"test 3 "}>test 3</option>
                    </select>
                </div>
                <div className="form">
                    <label>Medications Prescribed</label>
                    <select>
                        <option value={"test 1"}>test</option>
                        <option value={"test 2"}>test 2</option>
                        <option value={"test 3 "}>test 3</option>
                    </select>
                </div>
                <div className="form">
                    <label>Cost of Treatment</label>
                    <input
                        style={{ textAlign: "right" }}
                        id="rupiah"
                        datatype="currency"
                        inputMode="numeric"
                        type="text"
                        value={costForm != 0 ? `Rp. ${costForm}` : 0}
                        onChange={(val) => changeNumber(val.target.value)}
                    />
                </div>
                <br />
                {/* <input type="date" value={dateForm} onChange={(val) => setDateForm(val)} /> */}
                <input type="submit" onClick={() => setDateForm("")} />
                <Loader />
            </div>
        </div>
    );
}

export default App;
