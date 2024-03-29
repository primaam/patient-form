import React from "react";
import axios from "axios";
import "./App.css";
import Loader from "./components/loader/Loader";
import Form from "./components/form/Form";

// update learning
import { patientDataList } from "./util/FakeData";

let defaultForm = {
    patientName: "",
    patientId: "",
    date: "",
    treatDesc: [],
    medPrescribed: [],
    cost: "",
};

const treatOpt = [
    { id: 1, value: "option 1" },
    { id: 2, value: "option 2" },
    { id: 3, value: "option 3" },
    { id: 4, value: "option 4" },
    { id: 5, value: "option 5" },
];
const presribedOpt = [
    { id: 1, value: "option 1" },
    { id: 2, value: "option 2" },
    { id: 3, value: "option 3" },
    { id: 4, value: "option 4" },
    { id: 5, value: "option 5" },
];

function App() {
    const [patientNameForm, setPatientNameForm] = React.useState("");
    const [patientIdForm, setPatientIdForm] = React.useState("");
    const [dateForm, setDateForm] = React.useState("");
    const [treatDescForm, setTreatDescForm] = React.useState([]);
    const [medPrescribedForm, setMedPrescribedForm] = React.useState([]);
    const [costForm, setCostForm] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);
    // update
    const [list, setList] = React.useState([]);

    let expanded = {
        treat: false,
        med: false,
    };

    React.useEffect(() => {
        axios({
            url: "http://localhost:5000/",
            method: "get",
        }).then((res) => {
            console.log(res.data);
            setList(res.data);
        });
    }, []);

    const changeNumber = (num, prefix) => {
        let res = num.replace(/\D/g, "").toString();

        return setCostForm(res);
    };

    const showCheckboxes = (id) => {
        let treatCheckboxes = document.getElementById("treatCheckboxes");
        let medCheckboxes = document.getElementById("medCheckboxes");

        switch (id) {
            case "treat":
                if (expanded.treat === false) {
                    expanded.med = false;
                    medCheckboxes.style.display = "none";
                    treatCheckboxes.style.display = "block";
                    expanded.treat = true;
                } else {
                    treatCheckboxes.style.display = "none";
                    expanded.treat = false;
                }
                break;
            case "med":
                if (expanded.med === false) {
                    expanded.treat = false;
                    treatCheckboxes.style.display = "none";
                    medCheckboxes.style.display = "block";
                    expanded.med = true;
                } else {
                    medCheckboxes.style.display = "none";
                    expanded.med = false;
                }
                break;
            default:
                expanded = {
                    treat: false,
                    med: false,
                };
                break;
        }
    };

    const handleSubmit = () => {
        setIsLoading(true);
        const obj = {
            patient_name: patientNameForm,
            patient_id: patientIdForm,
            date: dateForm,
            treatment_desc: JSON.stringify(treatDescForm),
            medic_pres: JSON.stringify(medPrescribedForm),
            cost: parseInt(costForm),
        };
        if (
            patientNameForm === defaultForm.patientName ||
            patientIdForm === defaultForm.patientId ||
            dateForm === defaultForm.date ||
            treatDescForm.length === 0 ||
            medPrescribedForm.length === 0 ||
            costForm === defaultForm.cost
        ) {
            setIsLoading(false);
            alert("Please fill the empty field first");
        } else {
            axios({
                url: "http://localhost:5000/add_patient",
                method: "post",
                data: obj,
            }).then((res) => {
                if (res) {
                    setTimeout(() => {
                        axios({
                            url: "http://localhost:5000/",
                            method: "get",
                        }).then((res) => {
                            console.log(res.data);
                            setList(res.data);
                        });

                        setIsLoading(false);
                    }, 3000);
                    console.log("success");
                } else {
                    setIsLoading(false);
                }
            });
        }
    };

    return (
        <div className="App">
            <h1>Patient Form</h1>
            <div className="formlayout">
                <Form labelForm={"Patient ID"}>
                    <input
                        type="text"
                        value={patientIdForm}
                        onChange={(val) => setPatientIdForm(val.target.value)}
                    />
                </Form>
                <Form labelForm={"Patient Name"}>
                    <input
                        type="text"
                        value={patientNameForm}
                        onChange={(val) => setPatientNameForm(val.target.value)}
                    />
                </Form>
                <Form labelForm={"Date of Treatment"}>
                    <input
                        type="date"
                        value={dateForm}
                        onChange={(val) => setDateForm(val.target.value)}
                    />
                </Form>
                <Form labelForm={"Treatment Description"}>
                    <div className="multiselect">
                        <div className="selectBox" onClick={() => showCheckboxes("treat")}>
                            <select>
                                <option>
                                    {treatDescForm.length === 0
                                        ? "Select an option"
                                        : `${treatDescForm}`}
                                </option>
                            </select>
                            <div className="overSelect"></div>
                        </div>
                        <div id="treatCheckboxes">
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
                </Form>

                <Form labelForm={"Medications Prescribed"}>
                    <div className="multiselect">
                        <div className="selectBox" onClick={() => showCheckboxes("med")}>
                            <select>
                                <option>
                                    {medPrescribedForm.length === 0
                                        ? "Select an option"
                                        : `${medPrescribedForm}`}
                                </option>
                            </select>
                            <div className="overSelect"></div>
                        </div>
                        <div id="medCheckboxes">
                            {presribedOpt.map((item, i) => {
                                return (
                                    <label key={i}>
                                        <input
                                            onClick={() => {
                                                if (
                                                    medPrescribedForm.includes(item.value) === true
                                                ) {
                                                    let filter = medPrescribedForm.filter((opt) => {
                                                        return opt !== item.value;
                                                    });
                                                    setMedPrescribedForm(filter);
                                                } else {
                                                    setMedPrescribedForm([
                                                        ...medPrescribedForm,
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
                </Form>
                <Form labelForm={"Cost of Treatment"}>
                    <input
                        style={{ textAlign: "right" }}
                        id="rupiah"
                        datatype="currency"
                        inputMode="numeric"
                        type="text"
                        value={costForm !== 0 ? `Rp. ${costForm}` : 0}
                        onChange={(val) => changeNumber(val.target.value)}
                    />
                </Form>
                <br />
                <br />
                <div className="submitlayout">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <input className="submit" type="submit" onClick={() => handleSubmit()} />
                    )}
                </div>
            </div>
            <div className="listlayout">
                <table className="table">
                    <thead>
                        <tr className="tableheader">
                            <th>No</th>
                            <th>Patient Name</th>
                            <th>Patient ID</th>
                            <th>{`Cost (Rp)`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.length > 0 ? (
                            list.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.patient_name}</td>
                                        <td>{item.patient_id}</td>
                                        <td style={{ textAlign: "right" }}>
                                            {item.cost.toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr></tr>
                        )}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </div>
    );
}

export default App;
