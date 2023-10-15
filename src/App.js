import logo from "./logo.svg";
import "./App.css";
import { useCallback, useMemo, useState } from "react";
import Select from "react-select";
import { cloneDeep, uniqueId } from "lodash";

function App() {
  let customDropDownoptions = [
    {
      id: 1,
      label: "customDropDown_Name",
      value: "customDropDown_Name",
    },
    {
      id: 2,
      label: "customDropDown_Country_Id",
      value: "customDropDown_Country_Id",
    },
    {
      id: 3,
      label: "customDropDown_City",
      value: "customDropDown_City",
    },
    {
      id: 4,
      label: "customDropDown_Province",
      value: "customDropDown_Province",
    },
    {
      id: 5,
      label: "customDropDown_AccountId",
      value: "customDropDown_AccountId",
    },
    {
      id: 6,
      label: "customDropDown_AccountName",
      value: "customDropDown_AccountName",
    },
    {
      id: 7,
      label: "customDropDown_PhoneNum",
      value: "customDropDown_PhoneNum",
    },
    {
      id: 8,
      label: "customDropDown_CustomerName",
      value: "customDropDown_CustomerName",
    },


  ];

  const salesforceoptions = [
    {
      id: 1,
      label: "Salesforce_Name",
      value: "Salesforce_Name",
    },
    {
      id: 2,
      label: "Salesforce_Country_Id",
      value: "Salesforce_Country_Id",
    },
    {
      id: 3,
      label: "Salesfoce_City",
      value: "Salesfoce_City",
    },
    {
      id: 4,
      label: "Salesforce_Province",
      value: "Salesforce_Province",
    },
    {
      id: 5,
      label: "Salesforce_AccountId",
      value: "Salesforce_AccountId",
    },
    {
      id: 6,
      label: "Salesforce_AccountName",
      value: "Salesforce_AccountName",
    },
    {
      id: 7,
      label: "Salesforce_PhoneNum",
      value: "Salesforce_PhoneNum",
    },
    {
      id: 8,
      label: "Salesforce_CustomerName",
      value: "Salesforce_CustomerName",
    },
  ];

  const [addMoreValue, setaddMoreValue] = useState([
    {
      id: 1,
      salesforceValue: "",
      customDropDownValue: "",
      salesforceoptions:salesforceoptions,
      customDropDownoptions: customDropDownoptions
    },
  ]);

  const [result, setResult] = useState(null);

  const addMore = () => {
    const newDropdownId = uniqueId();

    const selectedSalesforceValues = addMoreValue.map(
      (dropdown) => dropdown.salesforceValue.value
    );
    const selectedcustomDropDownValues = addMoreValue.map(
      (dropdown) => dropdown.customDropDownValue.value
    );

    const newSalesforceOptions = salesforceoptions.filter(
      (option) => !selectedSalesforceValues.includes(option.value)
    );
    const newcustomDropDownOptions = customDropDownoptions.filter(
      (option) => !selectedcustomDropDownValues.includes(option.value)
    );

    setaddMoreValue([
      ...addMoreValue,
      {
        id: newDropdownId,
        salesforceValue: "",
        customDropDownValue: "",
        salesforceoptions: newSalesforceOptions,
        customDropDownoptions: newcustomDropDownOptions,
      },
    ]);
  };

  const onFocusHandle = (val, key, dropdowns) => {
    let dropdownValue = cloneDeep(addMoreValue);
    if (key === "salesforceValue") {
      const selectedSalesforceValues = dropdownValue.map(
        (dropdown) => dropdown.salesforceValue.value
      );

      const newSalesforceOptions = salesforceoptions.filter(
        (option) => !selectedSalesforceValues.includes(option.value)
      );
      dropdownValue.map((dropdown) => {
        if (dropdown?.id === dropdowns?.id) {
          dropdown["salesforceoptions"] = newSalesforceOptions;
        }
      });
    } else if (key === "customDropDownValue") {
      const selectedcustomDropDownValues = dropdownValue.map(
        (dropdown) => dropdown.customDropDownValue.value
      );

      const newcustomDropDownOptions = customDropDownoptions.filter(
        (option) => !selectedcustomDropDownValues.includes(option.value)
      );

      dropdownValue.map((dropdown) => {
        if (dropdown?.id === dropdowns?.id) {
          dropdown["customDropDownoptions"] = newcustomDropDownOptions;
        }
      });
    }

    setaddMoreValue(dropdownValue);
  };

  const onChange = (val, key, dropdowns) => {
    let dropdownValue = cloneDeep(addMoreValue);
    dropdownValue.map((dropdown) => {
      if (dropdown.id === dropdowns?.id) {
        dropdown[key] = val;
      }
    });

    setaddMoreValue(dropdownValue);
  };

  const onDeleteRow = (e, dropDowns) => {
    let dropdownValue = cloneDeep(addMoreValue);
    dropdownValue = dropdownValue.filter(
      (dropdown) => dropdown.id !== dropDowns?.id
    );
    setaddMoreValue(dropdownValue);
  };

  const onsubmit = (e) => {
    let dropdownValue = cloneDeep(addMoreValue);
    let result = "";
    if (
      dropdownValue?.length === 1 &&
      !dropdownValue?.[0]?.customDropDownValue &&
      !dropdownValue?.[0]?.salesforceValue
    ) {
      return;
    } else {
      dropdownValue.map((dropdown) => {
        delete dropdown["customDropDownoptions"];
        delete dropdown["salesforceoptions"];
      });
      result = dropdownValue;
    }

    setResult(result);
    console.log("Result ====", result);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="add_more" onClick={(e) =>
           addMore()}>
          Add more fields
        </div>
      </div>
      <div className="mapper__body">
        {addMoreValue.map((dropdown, index) => {
          return (
            <div className="row_wrapper">
              <div key={dropdown.id} className="select_wrap">
                <div className="left__wrap">
                  <Select
                    key={"s" + dropdown.id}
                    options={dropdown.salesforceoptions}
                    value={dropdown.salesforceValue}
                    onChange={(val) =>
                      onChange(val, "salesforceValue", dropdown)
                    }
                    onFocus={(val) =>
                      onFocusHandle(val, "salesforceValue", dropdown)
                    }
                  />
                </div>
                <div className="right__wrap">
                  <Select
                    key={"c" + dropdown.id}
                    options={dropdown.customDropDownoptions}
                    value={dropdown.customDropDownValue}
                    onChange={(val) => onChange(val, "customDropDownValue", dropdown)}
                    onFocus={(val) =>
                      onFocusHandle(val, "customDropDownValue", dropdown)
                    }
                  />
                </div>
              </div>

              <div className="delete__wrap">
                <div
                  onClick={(e) => onDeleteRow(e, dropdown)}
                  className="delete__btn"
                >
                  Delete
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="footer__body">
        <div className="submit_btn" onClick={(e) => onsubmit()}>
          Submit
        </div>
        {result && (
          <div className="result_wrap">
            <div className="result_wrap-cell result_wrap-header">
            <div className="result_wrap-left">
            salesforce
          </div>
          <div className="result_wrap-right">
            customDropDown
          </div>
            </div>
            {result.map((selectedOption) => {
              return (
                <div className="result_wrap-cell">
                  <div className="result_wrap-left">
                    {selectedOption.salesforceValue.label}
                  </div>
                  <div className="result_wrap-right">
                    {selectedOption.customDropDownValue.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
