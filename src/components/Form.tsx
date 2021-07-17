import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Typography,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Tooltip,
  Modal,
  Alert,
} from "antd";
import { observer } from "mobx-react";
import { ICDField } from "./ICDField";
import { useStore } from "../Context";
import { isArray, isEmpty } from "lodash";

import moment from "moment";
import DistSearchPopup, { validSearchTypes } from "./DistrictSearch";
import ApprovalRights from "./ApprovalRights";
import Declarations from "./Declarations";

// Languages
import englishString from "./../assets/english.json";
import frenchString from "./../assets/french.json";

// interface languageString {
//   English: string[]; // IFoo is indexable; not a new property
//   French: string[]; // IFoo is indexable; not a new property
// }

const allLanguages = [
  {
    langName: "English",
    lang: englishString,
  },
  {
    langName: "French",
    lang: frenchString,
  },
];

const { Option } = Select;
const { Title } = Typography;

export const DataEntryForm = observer(() => {
  const [form] = Form.useForm();
  const [optionSets, setOptionSets] = useState<any>();
  const [activeLanguage, setActiveLanguage] = useState(allLanguages[0]);
  const [activeLanguageString, setActiveLanguageString] = useState(
    allLanguages[0].langName
  );

  // Declarations
  const [declarations, setDeclarations] = useState({
    u9tYUv6AM51: false,
    ZXZZfzBpu8a: false,
    cp5xzqVU2Vw: false,
    lu9BiHPxNqH: "",
  });
  const [declarationsDefault, setDeclarationsDefault] = useState({
    u9tYUv6AM51: false,
    ZXZZfzBpu8a: false,
    cp5xzqVU2Vw: false,
    lu9BiHPxNqH: "",
  });
  const handleDeclarationOutput = (output: {
    u9tYUv6AM51: false;
    ZXZZfzBpu8a: false;
    cp5xzqVU2Vw: false;
    lu9BiHPxNqH: "";
  }) => {
    setDeclarations(output);
  };

  // Approval STatus
  const [approvalStatus, setApprovalStatus] = useState("Not Approved");
  const [approvalStatusFromEditedForm, setApprovalStatusFromEditedForm] =
    useState("");

  // Editing status
  const [editing, setEditing] = useState(false);

  // Searches (District and sub county)
  let anyArrayType: any[] = [];
  const [limitedArray, setLimitedArray] = useState(anyArrayType);
  const [limitedDistrictParent, setLimitedDistrictParent] = useState("");
  const [limitedRegionParent, setLimitedRegionParent] = useState("");
  const [chosenRegion, setChosenRegion] = useState("");
  const [chosenDistrict, setChosenDistrict] = useState("");
  const [chosenRegionToSubmit, setChosenRegionToSubmit] = useState("");
  const [chosenDistrictToSubmit, setChosenDistrictToSubmit] = useState("");
  const [chosenSubCounty, setChosenSubcounty] = useState("");

  //blacklist
  const blacklistedValues = ["N"];
  const [showBlackListWarning, setShowBlackListWarning] = useState(false);
  const [blackListedFound, setBlackListedFound] = useState(false);
  const [underlyingCauseKey, setUnderlyingCauseKey] = useState(Math.random());
  const [timeoutToClosePopup, setTimeoutToClosePopup] = useState(
    setTimeout(() => {
      return;
    }, 1000)
  );

  // Frame B hack
  const [disableFrameB, setDisableFrameB] = useState(true);
  const [disableFrameB2, setDisableFrameB2] = useState(true);
  const [frameBKey1, setFrameBKey1] = useState("1");
  const [frameBKey2, setFrameBKey2] = useState("2");
  const [frameBKey3, setFrameBKey3] = useState("3");
  const [frameBKey4, setFrameBKey4] = useState("4");

  // Fetal / Still born hack
  const [disableFetal, setDisableFetal] = useState(false);
  const [fetalDisableKey, setFetalDisableKey] = useState("5");

  // Check if woman was recently pregnant
  const [showPregnancyReminder, setShowPregnancyReminder] = useState(false);
  const [enablePregnantQn, setEnablePregnantQn] = useState(false);
  const [enablePregnantQnKey, setEnablePregnantQnKey] = useState("6");
  const [personsAge, setPersonsAge] = useState(1);
  const [personsGender, setPersonsGender] = useState("");
  const [womanWasPregnant, setWomanWasPregnant] = useState(false);

  // Keys related to was woman pregnant
  const [pregnantKey1, setPregnantKey1] = useState("7");
  const [pregnantKey2, setPregnantKey2] = useState("8");
  const [pregnantKey3, setPregnantKey3] = useState("9");
  const [pregnantKey4, setPregnantKey4] = useState("10");
  const [pregnantKey5, setPregnantKey5] = useState("11");
  const [pregnantKey6, setPregnantKey6] = useState("12");
  const [pregnantKey7, setPregnantKey7] = useState("13");

  const refreshAllPregnantKeys = (bool: boolean) => {
    setWomanWasPregnant(bool);
  };

  useEffect(() => {
    setPregnantKey1(`${Math.random()}`);
    setPregnantKey2(`${Math.random()}`);
    setPregnantKey3(`${Math.random()}`);
    setPregnantKey4(`${Math.random()}`);
    setPregnantKey5(`${Math.random()}`);
    setPregnantKey6(`${Math.random()}`);
    setPregnantKey7(`${Math.random()}`);
  }, [womanWasPregnant]);

  const titleBackgroundColor = "#f5f4f4";

  // Testing
  type altSearchBooleansOptions = {
    [key: string]: boolean;
  };
  let altSearchBooleans: altSearchBooleansOptions = {
    a: true,
    b: true,
    c: true,
    d: true,
  };
  const [altSearchIsDisabled, setAltSearchIsDisabled] =
    useState(altSearchBooleans);

  //   ICD Field Keys
  const [AKey, setAKey] = useState(Math.random());
  const [BKey, setBKey] = useState(Math.random());
  const [CKey, setCKey] = useState(Math.random());
  const [DKey, setDKey] = useState(Math.random());

  const [underlyingCauseCode, setUnderlyingCauseCode] = useState("");
  const [underlyingCauseText, setUnderlyingCauseText] = useState("");
  const [underlyingCauseURI, setUnderlyingCauseURI] = useState("");

  type underlyingCauseObjectOptions = {
    [key: string]: string;
  };
  let underlyingCauseObject: underlyingCauseObjectOptions = {
    a: "",
    b: "",
    c: "",
    d: "",
    diseaseTitleA: "",
    diseaseTitleB: "",
    diseaseTitleC: "",
    diseaseTitleD: "",
    diseaseURIA: "",
    diseaseURIB: "",
    diseaseURIC: "",
    diseaseURID: "",
  };
  const [underlyingCauses, setUnderlyingCauses] = useState(
    underlyingCauseObject
  );

  const [underlyingCauseChosen, setUnderlyingCauseChosen] = useState(false);

  const [underlyingCauseAlt, setUnderlyingCauseAlt] = useState("");
  // End of Testing

  const store = useStore();

  const onFinish = async (values: any) => {
    // console.log("VALUES ARE", values);

    // Force form to acknowledge controlled values
    values.twVlVWM3ffz = approvalStatus;
    // values.dTd7txVzhgY = underlyingCauseCode; // ???
    values.QTKk2Xt8KDu = underlyingCauseText; // text
    values.sJhOdGLD5lj = underlyingCauseCode; // term = code
    values.L97MrAMAav9 = underlyingCauseURI; // uri
    values.u44XP9fZweA = chosenDistrictToSubmit; // district
    values.t5nTEmlScSt = chosenSubCounty; // subcounty

    values = {
      ...values,
      ...declarations,
    };
    // Object.keys(declarations).forEach(item=>{
    //   if(declarations[item]){
    //     values[item]=declarations[item]
    //   }

    // })

    await store.addEvent(values);
  };

  const notTomorrow = (date: moment.Moment) => {
    return date.isAfter(moment());
  };

  useEffect(() => {
    store.loadUserOrgUnits().then(() => {
      setOptionSets(store.optionSets);
    });
  }, [store]);

  const [testVal, setTestVal] = useState("");
  const buttonA = () => {
    // form.setFieldsValue({ QHY3iYRLvMp: "" });
    // button()
    setTestVal("");
  };
  const [testVal2, setTestVal2] = useState("");
  const buttonB = () => {
    // form.setFieldsValue({ QHY3iYRLvMp: "" });
    // button()
    setTestVal2("");
  };
  const [testVal3, setTestVal3] = useState("");
  const buttonC = () => {
    // form.setFieldsValue({ QHY3iYRLvMp: "" });
    // button()
    setTestVal3("");
  };

  const [testVal4, setTestVal4] = useState("");
  const buttonD = () => {
    // form.setFieldsValue({ QHY3iYRLvMp: "" });
    // button()
    setTestVal4("");
  };

  // const [testValUnderlying, setTestValUnderlying] = useState("");
  // const buttonUnderlying = () => {
  //     // form.setFieldsValue({ QHY3iYRLvMp: "" });
  //     // button()
  //     setTestValUnderlying("");
  // };

  const valuesChange = (changedValues: any, allValues: any) => {
    console.log("A value has changed", allValues);
    if (
      changedValues.FhHPxY16vet &&
      form.getFieldValue("FhHPxY16vet") == true
    ) {
      //Desease
      //store.disableValue("FhHPxY16vet");//Disease
      store.disableValue("gNM2Yhypydx"); //accident
      store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
      store.disableValue("KsGOxFyzIs1"); //Assault
      store.disableValue("tYH7drlbNya"); //Legal intervention
      store.disableValue("xDMX2CJ4Xw3"); //War
      store.disableValue("b4yPk98om7e"); //Could not be determined
      store.disableValue("fQWuywOaoN2"); //Pending investigation
      store.disableValue("o1hG9vr0peF"); //Unknown
    }

    if (
      changedValues.gNM2Yhypydx &&
      form.getFieldValue("gNM2Yhypydx") == true
    ) {
      //Accident
      store.disableValue("FhHPxY16vet"); //Disease
      // store.disableValue("gNM2Yhypydx");//accident
      store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
      store.disableValue("KsGOxFyzIs1"); //Assault
      store.disableValue("tYH7drlbNya"); //Legal intervention
      store.disableValue("xDMX2CJ4Xw3"); //War
      store.disableValue("b4yPk98om7e"); //Could not be determined
      store.disableValue("fQWuywOaoN2"); //Pending investigation
      store.disableValue("o1hG9vr0peF"); //Unknown
    }

    if (
      changedValues.wX3i3gkTG4m &&
      form.getFieldValue("wX3i3gkTG4m") == true
    ) {
      //Intentional self-harm
      store.disableValue("FhHPxY16vet"); //Disease
      store.disableValue("gNM2Yhypydx"); //accident
      // store.disableValue("wX3i3gkTG4m");//Intentional self-harm
      store.disableValue("KsGOxFyzIs1"); //Assault
      store.disableValue("tYH7drlbNya"); //Legal intervention
      store.disableValue("xDMX2CJ4Xw3"); //War
      store.disableValue("b4yPk98om7e"); //Could not be determined
      store.disableValue("fQWuywOaoN2"); //Pending investigation
      store.disableValue("o1hG9vr0peF"); //Unknown
    }

    if (
      changedValues.KsGOxFyzIs1 &&
      form.getFieldValue("KsGOxFyzIs1") == true
    ) {
      //Assault
      store.disableValue("FhHPxY16vet"); //Disease
      store.disableValue("gNM2Yhypydx"); //accident
      store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
      // store.disableValue("KsGOxFyzIs1");//Assault
      store.disableValue("tYH7drlbNya"); //Legal intervention
      store.disableValue("xDMX2CJ4Xw3"); //War
      store.disableValue("b4yPk98om7e"); //Could not be determined
      store.disableValue("fQWuywOaoN2"); //Pending investigation
      store.disableValue("o1hG9vr0peF"); //Unknown
    }

    if (
      changedValues.tYH7drlbNya &&
      form.getFieldValue("tYH7drlbNya") == true
    ) {
      //Legal intervention
      store.disableValue("FhHPxY16vet"); //Disease
      store.disableValue("gNM2Yhypydx"); //accident
      store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
      store.disableValue("KsGOxFyzIs1"); //Assault
      //store.disableValue("tYH7drlbNya");//Legal intervention
      store.disableValue("xDMX2CJ4Xw3"); //War
      store.disableValue("b4yPk98om7e"); //Could not be determined
      store.disableValue("fQWuywOaoN2"); //Pending investigation
      store.disableValue("o1hG9vr0peF"); //Unknown
    }

    if (
      changedValues.xDMX2CJ4Xw3 &&
      form.getFieldValue("xDMX2CJ4Xw3") == true
    ) {
      //War
      store.disableValue("FhHPxY16vet"); //Disease
      store.disableValue("gNM2Yhypydx"); //accident
      store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
      store.disableValue("KsGOxFyzIs1"); //Assault
      store.disableValue("tYH7drlbNya"); //Legal intervention
      //store.disableValue("xDMX2CJ4Xw3");//War
      store.disableValue("b4yPk98om7e"); //Could not be determined
      store.disableValue("fQWuywOaoN2"); //Pending investigation
      store.disableValue("o1hG9vr0peF"); //Unknown
    }

    if (
      changedValues.b4yPk98om7e &&
      form.getFieldValue("b4yPk98om7e") == true
    ) {
      //Could not be determined
      store.disableValue("FhHPxY16vet"); //Disease
      store.disableValue("gNM2Yhypydx"); //accident
      store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
      store.disableValue("KsGOxFyzIs1"); //Assault
      store.disableValue("tYH7drlbNya"); //Legal intervention
      store.disableValue("xDMX2CJ4Xw3"); //War
      //store.disableValue("b4yPk98om7e");//Could not be determined
      store.disableValue("fQWuywOaoN2"); //Pending investigation
      store.disableValue("o1hG9vr0peF"); //Unknown
    }

    if (
      changedValues.fQWuywOaoN2 &&
      form.getFieldValue("fQWuywOaoN2") == true
    ) {
      //Pending investigation
      store.disableValue("FhHPxY16vet"); //Disease
      store.disableValue("gNM2Yhypydx"); //accident
      store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
      store.disableValue("KsGOxFyzIs1"); //Assault
      store.disableValue("tYH7drlbNya"); //Legal intervention
      store.disableValue("xDMX2CJ4Xw3"); //War
      store.disableValue("b4yPk98om7e"); //Could not be determined
      //store.disableValue("fQWuywOaoN2");//Pending investigation
      store.disableValue("o1hG9vr0peF"); //Unknown
    }

    if (
      changedValues.o1hG9vr0peF &&
      form.getFieldValue("o1hG9vr0peF") == true
    ) {
      //Unknown
      store.disableValue("FhHPxY16vet"); //Disease
      store.disableValue("gNM2Yhypydx"); //accident
      store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
      store.disableValue("KsGOxFyzIs1"); //Assault
      store.disableValue("tYH7drlbNya"); //Legal intervention
      store.disableValue("xDMX2CJ4Xw3"); //War
      store.disableValue("b4yPk98om7e"); //Could not be determined
      store.disableValue("fQWuywOaoN2"); //Pending investigation
      //store.disableValue("o1hG9vr0peF");//Unknown
    }

    if (
      !allValues.FhHPxY16vet &&
      !allValues.gNM2Yhypydx &&
      !allValues.wX3i3gkTG4m &&
      !allValues.KsGOxFyzIs1 &&
      !allValues.tYH7drlbNya &&
      !allValues.xDMX2CJ4Xw3 &&
      !allValues.b4yPk98om7e &&
      !allValues.fQWuywOaoN2 &&
      !allValues.o1hG9vr0peF
    ) {
      store.enableValue("FhHPxY16vet"); //Disease
      store.enableValue("gNM2Yhypydx"); //accident
      store.enableValue("wX3i3gkTG4m"); //Intentional self-harm
      store.enableValue("KsGOxFyzIs1"); //Assault
      store.enableValue("tYH7drlbNya"); //Legal intervention
      store.enableValue("xDMX2CJ4Xw3"); //War
      store.enableValue("b4yPk98om7e"); //Could not be determined
      store.enableValue("fQWuywOaoN2"); //Pending investigation
      store.enableValue("o1hG9vr0peF"); //Unknown
    }

    if (
      changedValues.e96GB4CXyd3 &&
      changedValues.e96GB4CXyd3 === "SX01-02" &&
      form.getFieldValue("q7e7FOXKnOf") > 10 &&
      form.getFieldValue("q7e7FOXKnOf") < 50
    ) {
      console.log("WOMAN and old enough");
      if (personsGender === "Male") {
        setShowPregnancyReminder(false);
        setEnablePregnantQn(false);
        setEnablePregnantQnKey(`${parseInt(enablePregnantQnKey) + 1}`);
      } else {
        setShowPregnancyReminder(true);
        setEnablePregnantQn(true);
        setEnablePregnantQnKey(`${parseInt(enablePregnantQnKey) + 1}`);
        window.alert(
          "Please Remember to fill in the section: For women, was the deceased pregnant or within 6 weeks of delivery?"
        );
      }
      //setEnablePregnantQn
    }

    if (changedValues.RbrUuKFSqkZ) {
      let years = moment().diff(changedValues.RbrUuKFSqkZ, "years");
      let hours = moment().diff(changedValues.RbrUuKFSqkZ, "hours");

      const dod = new Date("i8rrl8YWxLF");
      const dob = new Date("RbrUuKFSqkZ");

      form.setFieldsValue({ q7e7FOXKnOf: years });
      store.disableValue("q7e7FOXKnOf");

      if (years > 1) {
        store.disableValue("V4rE1tsj5Rb");
        store.disableValue("ivnHp4M4hFF");
        store.disableValue("jf9TogeSZpk");
        store.disableValue("xAWYJtQsg8M");
        store.disableValue("lQ1Byr04JTx");
        store.disableValue("DdfDMFW4EJ9");
        store.disableValue("GFVhltTCG8b");
      } else {
        store.enableValue("V4rE1tsj5Rb");
        store.enableValue("ivnHp4M4hFF");
        store.enableValue("jf9TogeSZpk");
        store.enableValue("xAWYJtQsg8M");
        store.enableValue("lQ1Byr04JTx");
        store.enableValue("DdfDMFW4EJ9");
        store.enableValue("GFVhltTCG8b");
      }

      if (hours < 24) {
        store.disableValue("jf9TogeSZpk");
      } else if (hours >= 24 && years <= 1) {
        store.enableValue("jf9TogeSZpk");
      }
    }

    console.log("clear working");
    if (changedValues.sfpqAeqKeyQ) {
      form.setFieldsValue({ zD0E77W4rFs: null });
      console.log("clear working");
    }

    if (changedValues.i8rrl8YWxLF) {
      if (
        changedValues.i8rrl8YWxLF.isBefore(form.getFieldValue("RbrUuKFSqkZ"))
      ) {
        form.setFieldsValue({ i8rrl8YWxLF: null });
      }
    }

    // if (changedValues.jY3K6Bv4o9Q && changedValues.jY3K6Bv4o9Q !== "YN01-01") {
    //   store.disableValue("UfG52s4YcUt");
    // } else if (
    //   changedValues.jY3K6Bv4o9Q &&
    //   changedValues.jY3K6Bv4o9Q === "YN01-01"
    // ) {
    //   store.enableValue("UfG52s4YcUt");
    // }

    if (changedValues.Ylht9kCLSRW) {
      store.enableValue("WkXxkKEJLsg");
    }

    if (changedValues.WkXxkKEJLsg) {
      store.enableValue("zb7uTuBCPrN");
      store.enableValue("QTKk2Xt8KDu");
    }

    if (changedValues.myydnkmLfhp) {
      store.enableValue("fleGy9CvHYh");
    }

    if (changedValues.fleGy9CvHYh) {
      store.enableValue("QGFYJK00ES7");
    }

    if (changedValues.aC64sB86ThG) {
      store.enableValue("hO8No9fHVd2");
    }

    if (changedValues.hO8No9fHVd2) {
      store.enableValue("CnPGhOcERFF");
    }

    if (changedValues.cmZrrHfTxW3) {
      store.enableValue("eCVDO6lt4go");
    }

    if (changedValues.eCVDO6lt4go) {
      store.enableValue("QTKk2Xt8KDu");
    }

    if (changedValues.AZSlwlRAFig) {
      store.enableValue("DKlOhZJOCrX");
      store.enableValue("kGIDD5xIeLC");
    } else if (!allValues.AZSlwlRAFig) {
      store.disableValue("DKlOhZJOCrX");
      store.disableValue("kGIDD5xIeLC");
    }

    if (changedValues.FhHPxY16vet) {
      store.disableValue("DKlOhZJOCrX");
      store.disableValue("kGIDD5xIeLC");
      store.disableValue("AZSlwlRAFig");
    } else if (!allValues.FhHPxY16vet) {
      store.enableValue("AZSlwlRAFig");
    }

    if (changedValues.U18Tnfz9EKd) {
      if (
        changedValues.U18Tnfz9EKd.isBefore(form.getFieldValue("RbrUuKFSqkZ")) ||
        changedValues.U18Tnfz9EKd.after(form.getFieldValue("i8rrl8YWxLF"))
      ) {
        form.setFieldsValue({ U18Tnfz9EKd: null });
      }
    }

    if (
      changedValues.ivnHp4M4hFF &&
      (changedValues.ivnHp4M4hFF === "YN01-01" ||
        changedValues.ivnHp4M4hFF === "YN01-03")
    ) {
      store.enableValue("jf9TogeSZpk");
    } else {
      store.disableValue("jf9TogeSZpk");
    }

    // if (changedValues.zcn7acUB6x1 && changedValues.zcn7acUB6x1 !== "YN01-01") {
    //   store.disableValue("KpfvNQSsWIw");
    //   store.disableValue("AJAraEcfH63");
    //   store.disableValue("RJhbkjYrODG");
    //   store.disableValue("ymyLrfEcYkD");
    //   store.disableValue("K5BDPJQk1BP");
    //   store.disableValue("Z41di0TRjIu");
    //   store.disableValue("uaxjt0inPNF");
    // } else if (changedValues.zcn7acUB6x1 === "YN01-01") {
    //   store.enableValue("KpfvNQSsWIw");
    //   store.enableValue("AJAraEcfH63");
    //   store.enableValue("RJhbkjYrODG");
    //   store.enableValue("ymyLrfEcYkD");
    //   store.enableValue("K5BDPJQk1BP");
    //   store.enableValue("Z41di0TRjIu");
    //   store.enableValue("uaxjt0inPNF");
    // }

    if (changedValues.e96GB4CXyd3 && changedValues.e96GB4CXyd3 !== "SX01-02") {
      // store.disableValue("zcn7acUB6x1");
      // store.disableValue("KpfvNQSsWIw");
      // store.disableValue("AJAraEcfH63");
      // store.disableValue("RJhbkjYrODG");
      // store.disableValue("ymyLrfEcYkD");
      // store.disableValue("K5BDPJQk1BP");
      // store.disableValue("Z41di0TRjIu");
      // store.disableValue("uaxjt0inPNF");
    } else if (
      changedValues.e96GB4CXyd3 &&
      changedValues.e96GB4CXyd3 === "SX01-02"
    ) {
      store.enableValue("zcn7acUB6x1");
      console.log("sex female");
      var x = form.getFieldValue("q7e7FOXKnOf");
      console.log(x);
    }

    if (changedValues.Kk0hmrJPR90 && changedValues.Kk0hmrJPR90 !== "YN01-01") {
      store.disableValue("j5TIQx3gHyF");
      store.disableValue("JhHwdQ337nn");
      // store.disableValue("jY3K6Bv4o9Q");
      // store.disableValue("UfG52s4YcUt");
    } else {
      store.enableValue("j5TIQx3gHyF");
      store.enableValue("JhHwdQ337nn");
      // store.enableValue("jY3K6Bv4o9Q");
      // store.enableValue("UfG52s4YcUt");
    }

    // if (changedValues.jY3K6Bv4o9Q && changedValues.jY3K6Bv4o9Q !== "YN01-01") {
    //   store.disableValue("UfG52s4YcUt");
    // } else {
    //   store.enableValue("UfG52s4YcUt");
    // }

    if (changedValues.j5TIQx3gHyF) {
      let weeks = moment(form.getFieldValue("i8rrl8YWxLF")).diff(
        changedValues.RbrUuKFSqkZ,
        "weeks"
      );
      if (weeks > 4) {
        form.setFieldsValue({ j5TIQx3gHyF: null });
      }
    }

    console.log("Changed value is ", changedValues);

    // console.log("working");
  };

  const optionSet = (
    os: string,
    field: string,
    optionalFunction?: Function,
    disabled?: boolean,
    optionalKey?: string
  ) => {
    const options = optionSets ? optionSets[os] : [];
    if (options) {
      return (
        <Select
          style={{ width: "100%" }}
          size="large"
          disabled={disabled || store.viewMode || store.allDisabled[field]}
          key={optionalKey || `${Math.random()}`}
          onChange={
            optionalFunction
              ? (e: any) => {
                  optionalFunction(e);
                }
              : (e: any) => {
                  return;
                }
          }
        >
          {options.map((option: any) => (
            <Option key={option.code} value={option.code}>
              {option.name}
            </Option>
          ))}
        </Select>
      );
    }
    return null;
  };

  // Testing
  const toggleEnableAltSearch = (id: any, value: boolean) => {
    let inputID = id;
    let inputValue = value;

    let newValues = altSearchIsDisabled;
    newValues[inputID] = inputValue;
    setAltSearchIsDisabled(newValues);
  };

  const editUnderlyingCauses = (
    id: string,
    value: string,
    diseaseTitle?: string,
    uri?: string
  ) => {
    let inputID = id;
    let inputValue = value;

    let newValues = underlyingCauses;
    newValues[inputID] = inputValue;
    if (diseaseTitle) {
      newValues["diseaseTitle" + id.toUpperCase()] = diseaseTitle;
    }
    if (uri) {
      newValues["diseaseURI" + id.toUpperCase()] = uri;
    }
    setUnderlyingCauses(newValues);
  };

  const addDiseaseTitle = (val: string) => {
    let keys = Object.keys(underlyingCauses);
    let titleToAdd = "";
    let uriToAdd = "";
    keys.forEach((item) => {
      if (
        underlyingCauses[item] === val &&
        item.includes("disease") === false
      ) {
        console.log("\n underlyingCauses[item] IS", underlyingCauses[item]);
        console.log(
          "\n diseaseTitle[item] IS",
          underlyingCauses["diseaseTitle" + item.toUpperCase()],
          "\n\n"
        );
        titleToAdd = underlyingCauses["diseaseTitle" + item.toUpperCase()];
        uriToAdd = underlyingCauses["diseaseURI" + item.toUpperCase()];
      }
    });
    console.log("\n\n Adding URI of ", uriToAdd, "\n\n");

    // This Updates the problematic field Next to State underlying cause
    // console.log("Val is ", val)
    // setUnderlyingCauseText(val.includes(")") ? val.split(")")[1].trim() : val);
    setUnderlyingCauseText(val);
    setUnderlyingCauseCode(titleToAdd);
    setUnderlyingCauseURI(uriToAdd);
    // console.log("\n\nCause (underlying):", titleToAdd, "\n\n");
    form.setFieldsValue({
      dTd7txVzhgY: titleToAdd,
    });
    // End of update
  };
  // End of Testing

  const styles = {
    flexRow: {
      display: "flex" as "flex",
      justifyContent: "space-between",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      alignItems: "center",
      // transform: "scale(0.8)",
    },
  };

  const handleUpdateApproval = (update: any) => {
    console.log("Update received as ", update);
    setApprovalStatus(update);

    // Force ant design to acknowledge the changed value
  };

  useEffect(() => {
    if (Object.keys(store.defaultValues).length) {
      setEditing(true);
      // Auto-populate form if it is an existing form being edited
      if (store.defaultValues.QTKk2Xt8KDu) {
        setUnderlyingCauseText(`${store.defaultValues.QTKk2Xt8KDu}`);
        setUnderlyingCauseCode(`${store.defaultValues.sJhOdGLD5lj}`);
        setChosenSubcounty(`${store.defaultValues.u44XP9fZweA}`);
        setChosenDistrict(`${store.defaultValues.t5nTEmlScSt}`);
        setUnderlyingCauseChosen(true);
        setPersonsGender(`${store.defaultValues.e96GB4CXyd3}`);
        setPersonsAge(Number(`${store.defaultValues.q7e7FOXKnOf}`));
        form.setFieldsValue({
          q7e7FOXKnOf: Number(`${store.defaultValues.q7e7FOXKnOf}`),
        });
        console.log("Chosen district is =>", store.defaultValues);
      }
      if (store.defaultValues.twVlVWM3ffz) {
        setApprovalStatusFromEditedForm(`${store.defaultValues.twVlVWM3ffz}`);
      }
      setDeclarationsDefault({
        u9tYUv6AM51: store.defaultValues.u9tYUv6AM51 ? true : false,
        ZXZZfzBpu8a: store.defaultValues.ZXZZfzBpu8a ? true : false,
        cp5xzqVU2Vw: store.defaultValues.cp5xzqVU2Vw ? true : false,
        lu9BiHPxNqH: `${store.defaultValues.lu9BiHPxNqH}`,
      });
    }
  }, [store.defaultValues]);

  useEffect(() => {
    setActiveLanguage(allLanguages[0]);
    setActiveLanguageString(allLanguages[0].langName);
    store.setActiveLanguage(allLanguages[0]);
  }, []);

  return (
    <Form
      form={form}
      name="death-certificate"
      onFinish={onFinish}
      scrollToFirstError={true}
      initialValues={store.defaultValues}
      onValuesChange={valuesChange}
    >
      <Card
        title={
          <Title level={2}>
            {activeLanguage.lang["Medical Certificate of Cause of Death"]}
          </Title>
        }
        actions={[
          <React.Fragment>
            <div style={styles.flexRow}>
              <p style={{ margin: "0rem" }}>
                {activeLanguage.lang["Inserting for"]}{" "}
                {store.currentOrganisation}{" "}
              </p>
              {!isEmpty(store.defaultValues) ? (
                <Popconfirm
                  title={activeLanguage.lang["Sure to delete?"]}
                  onConfirm={() => store.deleteEvent()}
                >
                  <Button size="large">{activeLanguage.lang["Delete"]}</Button>{" "}
                </Popconfirm>
              ) : null}
              <div>
                <Button
                  size="large"
                  onClick={() => {
                    store.showEvents();
                    store.enableForm();
                  }}
                >
                  {activeLanguage.lang["Cancel"]}
                </Button>

                <Button
                  htmlType="submit"
                  size="large"
                  disabled={
                    !underlyingCauseChosen ||
                    !personsGender ||
                    store.viewMode ||
                    (!declarations.ZXZZfzBpu8a &&
                      !declarations.cp5xzqVU2Vw &&
                      !declarations.lu9BiHPxNqH &&
                      !declarations.u9tYUv6AM51)
                  }
                >
                  {activeLanguage.lang["Save"]}
                </Button>
              </div>
            </div>
          </React.Fragment>,
          <ApprovalRights
            style={styles.flexRow}
            updateApprovalStatus={handleUpdateApproval}
            statusReceived={approvalStatusFromEditedForm}
          />,
        ]}
        type="inner"
        bodyStyle={{ maxHeight: "70vh", overflow: "auto" }}
      >
        <Form.Item
          label={activeLanguage.lang["Date of Entry"]}
          rules={[
            {
              type: "object",
              required: true,
              message: activeLanguage.lang["Please select date!"],
            },
          ]}
          name="eventDate"
          className="m-0"
        >
          <DatePicker
            disabledDate={notTomorrow}
            size="large"
            disabled={store.viewMode}
            placeholder={activeLanguage.lang["Select a Date"]}
          />
        </Form.Item>

        <Form.Item
          label={activeLanguage.lang.Languages}
          style={{ marginTop: "1rem" }}
          name="language"
          className="m-0"
        >
          <Select
            style={{ minWidth: "200px" }}
            size="large"
            placeholder={activeLanguageString}
            // disabled={disabled || store.viewMode || store.allDisabled[field]}
            // key={optionalKey || `${Math.random()}`}
            onChange={(val: any) => {
              setActiveLanguageString(`${val}`);
              const actualLang = allLanguages.find((l) => l.langName === val);
              if (actualLang && typeof actualLang === "object") {
                setActiveLanguage(actualLang);
                store.setActiveLanguage(actualLang);
              }
            }}
          >
            {allLanguages.map(({ lang, langName }) => (
              <Option key={Math.random()} value={`${langName}`}>
                {langName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <table className="my-2 w-full border-collapse">
          <tbody>
            <tr>
              <td className="border p-1" colSpan={2}>
                <b>
                  {
                    activeLanguage.lang[
                      "Ministry of Health National Case Number"
                    ]
                  }
                </b>
              </td>
              <td className="border p-1" colSpan={2}>
                <Form.Item name="ZKBE8Xm9DJG" className="m-0">
                  <Input
                    size="large"
                    disabled={store.viewMode || store.allDisabled.ZKBE8Xm9DJG}
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["Name (Full name):"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Enter full name",
                    },
                  ]}
                  name="ZYKmQ9GPOaF"
                  className="m-0"
                >
                  <Input
                    size="large"
                    disabled={store.viewMode || store.allDisabled.ZYKmQ9GPOaF}
                  />
                </Form.Item>
              </td>
              <td className="border p-1">
                <b>
                  {activeLanguage.lang["NIN (National Identification Number)"]}
                </b>
              </td>
              <td className="border p-1">
                <Form.Item name="MOstDqSY0gO" className="m-0">
                  <Input
                    size="large"
                    disabled={store.viewMode || store.allDisabled.MOstDqSY0gO}
                  />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["Region"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item name="zwKo51BEayZ" className="m-0">
                  <DistSearchPopup
                    disabled={store.viewMode || store.allDisabled.zwKo51BEayZ}
                    searchType={validSearchTypes.region}
                    // setLimitedArray={limitedRegionParent}
                    dictatedContent={chosenDistrict}
                    // setLimitedArrayParent={setLimitedRegionParent}
                    receiveOutput={(text: any) =>
                      setChosenRegionToSubmit(`${text}`)
                    }
                  />

                  {/* <Input
                    size="large"
                    disabled={store.viewMode || store.allDisabled.zwKo51BEayZ}
                  /> */}
                </Form.Item>
              </td>

              <td className="border p-1">{/* <b>Region2</b> */}</td>
              <td className="border p-1">
                <Form.Item
                  name="twVlVWM3ffz"
                  className="m-0"
                  style={{ height: "0rem" }}
                >
                  <Input
                    type="hidden"
                    disabled={false}
                    size="large"
                    value={approvalStatus}
                    defaultValue={approvalStatus}
                    onChange={(e) => {}}
                  />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["District"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item name="t5nTEmlScSt" className="m-0">
                  <DistSearchPopup
                    disabled={
                      store.viewMode ||
                      store.allDisabled.t5nTEmlScSt ||
                      !chosenRegionToSubmit
                    }
                    searchType={validSearchTypes.district}
                    parentName={chosenRegionToSubmit}
                    // setLimitedArray={setLimitedDistrictParent}
                    dictatedContent={chosenDistrict}
                    // setLimitedArrayParent={setLimitedRegionParent}
                    receiveOutput={(text: any) =>
                      setChosenDistrictToSubmit(`${text}`)
                    }
                  />
                </Form.Item>
                {/* <Form.Item name="bNpMzyShDCX" className="m-0">
                  <Input
                    size="large"
                    disabled={store.viewMode || store.allDisabled.bNpMzyShDCX}
                  />
                </Form.Item> */}
              </td>
              <td className="border p-1">
                <b>{activeLanguage.lang["Occupation"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item name="b70okb06FWa" className="m-0">
                  <Input
                    size="large"
                    disabled={store.viewMode || store.allDisabled.b70okb06FWa}
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["Sub-County"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item name="u44XP9fZweA" className="m-0">
                  <DistSearchPopup
                    // limitedArray={limitedArray}
                    parentName={chosenDistrictToSubmit}
                    disabled={
                      store.viewMode ||
                      store.allDisabled.u44XP9fZweA ||
                      !chosenDistrictToSubmit
                    }
                    searchType={validSearchTypes.subCounty}
                    setDictatedContent={setChosenDistrict}
                    // limitedArrayParent={limitedArrayParent}
                    dictatedContent={chosenSubCounty}
                    receiveOutput={(text: any) => setChosenSubcounty(`${text}`)}
                  />
                </Form.Item>
              </td>
              <td className="border p-1">
                {/* <b>Usual Residence (District)</b> */}
              </td>
              <td className="border p-1">
                <Form.Item name="t5nTEmlScSt" className="m-0">
                  {/* <DistSearchPopup
                    disabled={store.viewMode || store.allDisabled.t5nTEmlScSt}
                    searchType="district"
                    setLimitedArray={setLimitedArray}
                    dictatedContent={chosenDistrict}
                    setLimitedArrayParent={setLimitedArrayParent}
                    receiveOutput={(text: any) =>
                      setChosenDistrictToSubmit(`${text}`)
                    }
                  /> */}
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["Village"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item name="dsiwvNQLe5n" className="m-0">
                  <Input
                    size="large"
                    disabled={store.viewMode || store.allDisabled.dsiwvNQLe5n}
                  />
                </Form.Item>
              </td>
              <td className="border p-1">
                <b>{activeLanguage.lang["Date of Birth"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item
                  rules={[
                    {
                      type: "object",
                      required: true,
                      message: "Please select date!",
                    },
                  ]}
                  name="RbrUuKFSqkZ"
                  className="m-0"
                >
                  <DatePicker
                    disabledDate={notTomorrow}
                    size="large"
                    placeholder={activeLanguage.lang["Select a Date"]}
                    disabled={store.viewMode || store.allDisabled.RbrUuKFSqkZ}
                    onChange={(e: any) => {
                      if (e?._d) {
                        const birthDate = new Date(e?._d);
                        const ageInYears = moment().diff(birthDate, "years");
                        if (ageInYears < 50 && ageInYears > 10) {
                          setPersonsAge(ageInYears);
                        }
                      }
                    }}
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>Age</b>
              </td>
              <td className="border p-1">
                <Form.Item
                  rules={[
                    {
                      type: "integer",
                      required: false,
                      message:
                        activeLanguage.lang["Enter a valid age below 120"],
                      max: 120,
                    },
                  ]}
                  name="q7e7FOXKnOf"
                  className="m-0"
                >
                  <InputNumber
                    size="large"
                    disabled={store.viewMode || store.allDisabled.q7e7FOXKnOf}
                    onChange={(e: any) => {
                      // console.log("Age changed to", e);

                      setPersonsAge(e);
                      if (personsGender === "Male") {
                        setShowPregnancyReminder(false);
                        setEnablePregnantQn(false);
                        setEnablePregnantQnKey(
                          `${parseInt(enablePregnantQnKey) + 1}`
                        );
                        return;
                      }

                      if (personsGender === "Female" && e < 50 && e > 10) {
                        setShowPregnancyReminder(true);
                        setEnablePregnantQn(true);
                        setEnablePregnantQnKey(
                          `${parseInt(enablePregnantQnKey) + 1}`
                        );
                        window.alert(
                          activeLanguage.lang[
                            "Please Remember to fill in the section: For women, was the deceased pregnant or within 6 weeks of delivery?"
                          ]
                        );
                      }
                    }}
                  />
                </Form.Item>
              </td>
              <td className="border p-1">
                <b>{activeLanguage.lang["Sex"]}</b>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: activeLanguage.lang["Sex is required"],
                      },
                    ]}
                    name="e96GB4CXyd3"
                    className="m-0"
                  >
                    {optionSet("SX01", "e96GB4CXyd3", (e: any) => {
                      setPersonsGender(e);
                      if (e === "Male") {
                        setShowPregnancyReminder(false);
                        setEnablePregnantQn(false);
                        setEnablePregnantQnKey(
                          `${parseInt(enablePregnantQnKey) + 1}`
                        );
                        return;
                      }
                      if (e === "Female") {
                        console.log("Is female");
                        if (personsAge < 50 && personsAge > 10) {
                          setShowPregnancyReminder(true);
                          setEnablePregnantQn(true);
                          setEnablePregnantQnKey(
                            `${parseInt(enablePregnantQnKey) + 1}`
                          );
                          window.alert(
                            activeLanguage.lang[
                              "Please Remember to fill in the section: For women, was the deceased pregnant or within 6 weeks of delivery?"
                            ]
                          );
                        }
                      }
                    })}
                  </Form.Item>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["Place of Birth"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item name="xNCSFrgdUgi" className="m-0">
                  <Input
                    size="large"
                    disabled={store.viewMode || store.allDisabled.xNCSFrgdUgi}
                  />
                </Form.Item>
              </td>
              <td className="border p-1">
                <b>{activeLanguage.lang["Date and time of death"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item
                  rules={[
                    {
                      type: "object",
                      required: true,
                      message:
                        activeLanguage.lang[
                          "Please select date and time of death!"
                        ],
                    },
                  ]}
                  name="i8rrl8YWxLF"
                  className="m-0"
                >
                  <DatePicker
                    disabledDate={notTomorrow}
                    size="large"
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder={
                      activeLanguage.lang["Select date and time of death"]
                    }
                    disabled={store.viewMode || store.allDisabled.i8rrl8YWxLF}
                    onChange={(e: any) => {
                      var minutes = 1000 * 60;
                      var hours = minutes * 60;
                      var days = hours * 24;

                      var foo_date1 = form.getFieldValue("RbrUuKFSqkZ");
                      var foo_date2 = form.getFieldValue("i8rrl8YWxLF");
                      var diff_date = Math.round(
                        (foo_date2 - foo_date1) / days
                      );

                      console.log(diff_date);
                      // console.log("function diffdate has been run ");

                      if (diff_date < 25) {
                        window.alert(
                          activeLanguage.lang[
                            "Please remember that you should also complete the section 'Fetal or infant Death'"
                          ]
                        );
                      }
                    }}
                  />
                </Form.Item>
                {form.getFieldValue("i8rrl8YWxLF") -
                  form.getFieldValue("RbrUuKFSqkZ") <
                  0 && form.getFieldValue("i8rrl8YWxLF") != 0 ? (
                  <span style={{ color: "Red" }}>
                    {activeLanguage.lang["Date of Death cannot be before DOB"]}
                  </span>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="my-2 w-full border-collapse px-2">
          <tbody>
            <tr>
              <td
                colSpan={7}
                className="border p-1 text-lg"
                style={{ background: titleBackgroundColor }}
              >
                <h3
                  style={{
                    fontWeight: "bolder",
                    color: "#000085",
                  }}
                >
                  {activeLanguage.lang["Frame A: Medical Data. Part 1 and 2"]}
                </h3>
              </td>
            </tr>
            <tr>
              <th style={{ width: "15%" }}></th>
              <th style={{ width: "5%" }}></th>
              <th style={{ width: "25%" }}></th>
              <th style={{ width: "15%" }}></th>
              <th style={{ width: "20%" }}></th>
              <th style={{ width: "10%" }}></th>
              <th style={{ width: "7%" }}></th>
            </tr>
            <tr>
              <td className="border p-1 w-1/4"></td>
              <td className="border p-1" />
              <td className="border p-1">
                {" "}
                <b>{activeLanguage.lang["Cause of death"]}</b>{" "}
              </td>
              <td className="border p-1">
                {" "}
                <b>{activeLanguage.lang["Code"]}</b>{" "}
              </td>
              <td className="border p-1">
                {" "}
                <b>{activeLanguage.lang["Cause of Death Free Text"]}</b>{" "}
              </td>
              <td className="border p-1">
                {" "}
                <b>
                  {
                    activeLanguage.lang[
                      "Time interval type from onset to death"
                    ]
                  }
                </b>
              </td>
              <td className="border p-1">
                {" "}
                <b>
                  {activeLanguage.lang["Time interval from onset to death"]}
                </b>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                {" "}
                <b>
                  {
                    activeLanguage.lang[
                      "Report disease or condition directly leading to death on line"
                    ]
                  }
                  a
                </b>
              </td>
              <td className="border p-1">
                {" "}
                <b>a</b>{" "}
              </td>

              {/* ICD FIELD */}
              <td className="border p-1">
                <ICDField
                  id="icdField1"
                  enableAltText={(value: boolean) => {
                    toggleEnableAltSearch("a", value);
                  }}
                  disabled={store.allDisabled.sfpqAeqKeyQ}
                  next="Ylht9kCLSRW"
                  form={form}
                  field="sfpqAeqKeyQ"
                  codeField="zD0E77W4rFs"
                  uriField="k9xdBQzYMXo"
                  searchQueryField="cSDJ9kSJkFP"
                  bestMatchTextField="ZwBcxhUGzMb"
                  addUnderlyingCause={(value: any, title?: any, uri?: any) => {
                    editUnderlyingCauses(
                      "a",
                      title ? title : null,
                      value,
                      uri ? uri : null
                    );
                  }}
                  key={AKey}
                  resetUnderlyingCauseDropdown={setUnderlyingCauseKey}
                />
              </td>

              {/* CODE */}
              <td className="border p-1">
                <Form.Item name="zD0E77W4rFs" className="m-0">
                  <Input
                    readOnly={true}
                    size="large"
                    disabled={store.viewMode || store.allDisabled.zD0E77W4rFs}
                  />
                </Form.Item>
              </td>

              {/* CAUSE OF DEATH */}
              <td className="border p-1">
                <Form.Item name="QHY3iYRLvMp" className="m-0">
                  <table>
                    <tr>
                      <td>
                        <Input
                          size="large"
                          disabled={
                            store.viewMode ||
                            store.allDisabled.QHY3iYRLvMp ||
                            altSearchIsDisabled.a
                          }
                          value={testVal}
                          onChange={(e: any) => {
                            setTestVal(e.target.value);
                            editUnderlyingCauses("a", e.target.value);
                          }}
                        />
                      </td>
                      <td>
                        <Popconfirm
                          title={activeLanguage.lang["Sure to add coded COD"]}
                          onConfirm={() => {
                            buttonA();

                            //   Enable the search field and disable this one
                            store.enableValue("zD0E77W4rFs");
                            store.enableValue("sfpqAeqKeyQ");
                            store.disableValue("QHY3iYRLvMp");
                            store.disableValue("Ylht9kCLSRW");
                            form.setFieldsValue({ zD0E77W4rFs: null });
                            form.setFieldsValue({ sfpqAeqKeyQ: null });

                            setTimeout(() => {
                              //  Force rerender of icd field
                              setAKey(Math.random());
                            }, 200);
                          }}
                        >
                          <Button size="large" name="btnFreeTextA">
                            X
                          </Button>
                        </Popconfirm>
                      </td>
                    </tr>
                  </table>
                </Form.Item>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="Ylht9kCLSRW" className="m-0">
                    {optionSet("TI01", "Ylht9kCLSRW")}
                  </Form.Item>
                ) : null}
              </td>
              <td className="border p-1">
                <Form.Item name="WkXxkKEJLsg" className="m-0">
                  <InputNumber
                    min={1}
                    size="large"
                    disabled={store.viewMode || store.allDisabled.WkXxkKEJLsg}
                  />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1" rowSpan={3}>
                <b>
                  {
                    activeLanguage.lang[
                      "Report chain of events 'due to' (b to d) in order (if applicable)"
                    ]
                  }
                </b>{" "}
              </td>
              <td className="border p-1">
                <b>b</b>
              </td>
              <td className="border p-1">
                <ICDField
                  id="icdField2"
                  next="myydnkmLfhp"
                  enableAltText={(value: boolean) => {
                    toggleEnableAltSearch("b", value);
                  }}
                  disabled={store.allDisabled.zb7uTuBCPrN}
                  form={form}
                  field="zb7uTuBCPrN"
                  searchQueryField="uckvenVFnwf"
                  codeField="tuMMQsGtE69"
                  uriField="yftBZ5bSEOb"
                  key={BKey}
                  addUnderlyingCause={(value: any, title?: any, uri?: any) => {
                    editUnderlyingCauses(
                      "b",
                      title ? title : null,
                      value,
                      uri ? uri : null
                    );
                  }}
                  resetUnderlyingCauseDropdown={setUnderlyingCauseKey}
                />
              </td>
              <td className="border p-1">
                <Form.Item name="tuMMQsGtE69" className="m-0">
                  <Input
                    readOnly={true}
                    size="large"
                    disabled={store.viewMode || store.allDisabled.tuMMQsGtE69}
                  />
                </Form.Item>
              </td>
              <td className="border p-1">
                <Form.Item name="NkiH8GTX6HC" className="m-0">
                  <table>
                    <tr>
                      <td>
                        <Input
                          size="large"
                          disabled={
                            store.viewMode ||
                            store.allDisabled.NkiH8GTX6HC ||
                            altSearchIsDisabled.b
                          }
                          value={testVal2}
                          onChange={(e: any) => {
                            setTestVal2(e.target.value);
                            editUnderlyingCauses("b", e.target.value);
                          }}
                        />
                      </td>
                      <td>
                        <Popconfirm
                          title={activeLanguage.lang["Sure to add coded COD"]}
                          onConfirm={() => {
                            buttonB();

                            //   Enable the search field and disable this one
                            store.enableValue("tuMMQsGtE69");
                            store.enableValue("zb7uTuBCPrN");

                            store.disableValue("NkiH8GTX6HC");
                            store.disableValue("myydnkmLfhp");
                            form.setFieldsValue({ tuMMQsGtE69: null });
                            form.setFieldsValue({ zb7uTuBCPrN: null });

                            setTimeout(() => {
                              //  Force rerender of icd field
                              setBKey(Math.random());
                            }, 200);
                          }}
                        >
                          <Button size="large" name="btnFreeTextB">
                            X
                          </Button>
                        </Popconfirm>
                      </td>
                    </tr>
                  </table>
                </Form.Item>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="myydnkmLfhp" className="m-0">
                    {optionSet("TI01", "myydnkmLfhp")}
                  </Form.Item>
                ) : null}
              </td>
              <td className="border p-1">
                <Form.Item name="fleGy9CvHYh" className="m-0">
                  <InputNumber
                    min={1}
                    size="large"
                    disabled={store.viewMode || store.allDisabled.fleGy9CvHYh}
                  />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1">
                <b>c</b>
              </td>
              <td className="border p-1">
                <ICDField
                  id="icdField3"
                  enableAltText={(value: boolean) => {
                    toggleEnableAltSearch("c", value);
                  }}
                  next="aC64sB86ThG"
                  disabled={store.allDisabled.QGFYJK00ES7}
                  form={form}
                  field="QGFYJK00ES7"
                  searchQueryField="ZFdJRT3PaUd"
                  codeField="C8n6hBilwsX"
                  uriField="fJUy96o8akn"
                  key={CKey}
                  addUnderlyingCause={(value: any, title?: any, uri?: any) => {
                    editUnderlyingCauses(
                      "c",
                      title ? title : null,
                      value,
                      uri ? uri : null
                    );
                  }}
                  resetUnderlyingCauseDropdown={setUnderlyingCauseKey}
                />
              </td>

              <td className="border p-1">
                <Form.Item name="C8n6hBilwsX" className="m-0">
                  <Input
                    readOnly={true}
                    size="large"
                    disabled={store.viewMode || store.allDisabled.C8n6hBilwsX}
                  />
                </Form.Item>
              </td>
              <td className="border p-1">
                <Form.Item name="SDPq8UURlWc" className="m-0">
                  <table>
                    <tr>
                      <td>
                        <Input
                          size="large"
                          disabled={
                            store.viewMode ||
                            store.allDisabled.SDPq8UURlWc ||
                            altSearchIsDisabled.c
                          }
                          value={testVal3}
                          onChange={(e: any) => {
                            setTestVal3(e.target.value);
                            editUnderlyingCauses("c", e.target.value);
                          }}
                        />
                      </td>
                      <td>
                        <Popconfirm
                          title={activeLanguage.lang["Sure to add coded COD"]}
                          onConfirm={() => {
                            buttonC();

                            //   Enable the search field and disable this one
                            store.enableValue("C8n6hBilwsX");
                            store.enableValue("QGFYJK00ES7");
                            store.disableValue("SDPq8UURlWc");
                            store.disableValue("aC64sB86ThG");
                            form.setFieldsValue({ C8n6hBilwsX: null });
                            form.setFieldsValue({ QGFYJK00ES7: null });

                            setTimeout(() => {
                              //  Force rerender of icd field
                              setCKey(Math.random());
                            }, 200);
                          }}
                        >
                          <Button size="large" name="btnFreeTextC">
                            X
                          </Button>
                        </Popconfirm>
                      </td>
                    </tr>
                  </table>
                </Form.Item>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="aC64sB86ThG" className="m-0">
                    {optionSet("TI01", "aC64sB86ThG")}
                  </Form.Item>
                ) : null}
              </td>
              <td className="border p-1">
                <Form.Item name="hO8No9fHVd2" className="m-0">
                  <InputNumber
                    min={1}
                    size="large"
                    disabled={store.viewMode || store.allDisabled.hO8No9fHVd2}
                  />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1">
                <b>d</b>
              </td>
              <td className="border p-1">
                <ICDField
                  id="icdField4"
                  enableAltText={(value: boolean) => {
                    toggleEnableAltSearch("d", value);
                  }}
                  next="cmZrrHfTxW3"
                  disabled={store.allDisabled.CnPGhOcERFF}
                  form={form}
                  field="CnPGhOcERFF"
                  searchQueryField="Op5pSvgHo1M"
                  codeField="IeS8V8Yf40N"
                  uriField="S53kx50gjQn"
                  key={DKey}
                  addUnderlyingCause={(value: any, title?: any, uri?: any) => {
                    editUnderlyingCauses(
                      "d",
                      title ? title : null,
                      value,
                      uri ? uri : null
                    );
                  }}
                  resetUnderlyingCauseDropdown={setUnderlyingCauseKey}
                />
              </td>
              <td className="border p-1">
                <Form.Item name="IeS8V8Yf40N" className="m-0">
                  <Input
                    readOnly={true}
                    size="large"
                    disabled={store.viewMode || store.allDisabled.IeS8V8Yf40N}
                  />
                </Form.Item>
              </td>
              <td className="border p-1">
                <Form.Item name="zqW9xWyqOur" className="m-0">
                  <table>
                    <tr>
                      <td>
                        <Input
                          size="large"
                          disabled={
                            store.viewMode ||
                            store.allDisabled.zqW9xWyqOur ||
                            altSearchIsDisabled.d
                          }
                          value={testVal4}
                          onChange={(e: any) => {
                            setTestVal4(e.target.value);
                            editUnderlyingCauses("d", e.target.value);
                          }}
                        />
                      </td>
                      <td>
                        <Popconfirm
                          title={activeLanguage.lang["Sure to add coded COD"]}
                          onConfirm={() => {
                            buttonD();

                            //   Enable the search field and disable this one
                            store.enableValue("IeS8V8Yf40N");
                            store.enableValue("CnPGhOcERFF");
                            store.disableValue("zqW9xWyqOur");
                            store.disableValue("cmZrrHfTxW3");
                            form.setFieldsValue({ IeS8V8Yf40N: null });
                            form.setFieldsValue({ CnPGhOcERFF: null });

                            setTimeout(() => {
                              //  Force rerender of icd field
                              setDKey(Math.random());
                            }, 200);
                          }}
                        >
                          <Button name="btnFreeTextD" size="large">
                            X
                          </Button>
                        </Popconfirm>
                      </td>
                    </tr>
                  </table>
                </Form.Item>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="cmZrrHfTxW3" className="m-0">
                    {optionSet("TI01", "cmZrrHfTxW3")}
                  </Form.Item>
                ) : null}
              </td>
              <td className="border p-1">
                <Form.Item name="eCVDO6lt4go" className="m-0">
                  <InputNumber
                    min={1}
                    size="large"
                    disabled={store.viewMode || store.allDisabled.eCVDO6lt4go}
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={2}>
                <b>{activeLanguage.lang["State the underlying cause"]}</b>
              </td>
              <td className="border p-1" colSpan={2}>
                {/* Testing */}
                {/* {optionSets ? <Form.Item
                                  rules={[{ required: true, message: 'Select the underlying cause'}]}
                                    name="QTKk2Xt8KDu"
                                    className="m-0"
                                  >
                                    
                                    {optionSet('100U', 'QTKk2Xt8KDu')}
                                  </Form.Item> : null} */}

                {
                  <Tooltip
                    title={
                      activeLanguage.lang[
                        "NOTE: any values whose code begins with N are injuries and as such cannot be selected as an underlying cause of death."
                      ]
                    }
                    visible={showBlackListWarning}
                    style={{
                      background: "#fff",
                      color: "#000",
                    }}
                  >
                    {editing ? (
                      <Select
                        key={underlyingCauseKey}
                        style={{ width: "100%" }}
                        size="large"
                        value={underlyingCauseText}
                        disabled={store.viewMode}
                        onDropdownVisibleChange={(change) => {
                          // Inform user if any blacklisted values were found

                          if (
                            change === true &&
                            blackListedFound &&
                            !showBlackListWarning
                          ) {
                            setShowBlackListWarning(true);

                            // Hide the popup after 8 seconds
                            let timeout = setTimeout(() => {
                              setShowBlackListWarning(false);
                            }, 8000);

                            setTimeoutToClosePopup(timeout);
                          }
                          if (!change && showBlackListWarning) {
                            setShowBlackListWarning(false);

                            if (timeoutToClosePopup) {
                              clearTimeout(timeoutToClosePopup);
                            }
                          }
                        }}
                        onChange={(e: any) => {
                          // console.log("Changing the underlying cause", e);
                          setUnderlyingCauseChosen(true);
                          addDiseaseTitle(e);
                        }}
                      >
                        {Object.keys(underlyingCauses).map((option: any) => {
                          if (
                            option.includes("disease") === false &&
                            blacklistedValues.includes(
                              underlyingCauses[
                                `diseaseTitle${option.toUpperCase()}`
                              ][0]
                            ) === false
                          ) {
                            return (
                              <Option
                                key={Math.random()}
                                value={underlyingCauses[option]}
                              >
                                {`(${option}) ${
                                  underlyingCauses[option]
                                    ? underlyingCauses[option]
                                    : ""
                                }`}
                              </Option>
                            );
                          } else if (
                            option.includes("disease") === false &&
                            blacklistedValues.includes(
                              underlyingCauses[
                                `diseaseTitle${option.toUpperCase()}`
                              ][0]
                            ) === true &&
                            !blackListedFound
                          ) {
                            setBlackListedFound(true);
                          }
                        })}
                      </Select>
                    ) : (
                      <Select
                        key={underlyingCauseKey}
                        style={{ width: "100%" }}
                        size="large"
                        disabled={store.viewMode}
                        onDropdownVisibleChange={(change) => {
                          // Inform user if any blacklisted values were found

                          if (
                            change === true &&
                            blackListedFound &&
                            !showBlackListWarning
                          ) {
                            setShowBlackListWarning(true);

                            // Hide the popup after 8 seconds
                            let timeout = setTimeout(() => {
                              setShowBlackListWarning(false);
                            }, 8000);

                            setTimeoutToClosePopup(timeout);
                          }
                          if (!change && showBlackListWarning) {
                            setShowBlackListWarning(false);

                            if (timeoutToClosePopup) {
                              clearTimeout(timeoutToClosePopup);
                            }
                          }
                        }}
                        onChange={(e: any) => {
                          // console.log("Changing the underlying cause", e);
                          setUnderlyingCauseChosen(true);
                          addDiseaseTitle(e);
                        }}
                      >
                        {Object.keys(underlyingCauses).map((option: any) => {
                          if (
                            option.includes("disease") === false &&
                            blacklistedValues.includes(
                              underlyingCauses[
                                `diseaseTitle${option.toUpperCase()}`
                              ][0]
                            ) === false
                          ) {
                            return (
                              <Option
                                key={Math.random()}
                                value={underlyingCauses[option]}
                              >
                                {`(${option}) ${
                                  underlyingCauses[option]
                                    ? underlyingCauses[option]
                                    : ""
                                }`}
                              </Option>
                            );
                          } else if (
                            option.includes("disease") === false &&
                            blacklistedValues.includes(
                              underlyingCauses[
                                `diseaseTitle${option.toUpperCase()}`
                              ][0]
                            ) === true &&
                            !blackListedFound
                          ) {
                            setBlackListedFound(true);
                          }
                        })}
                      </Select>
                    )}
                  </Tooltip>
                }
                {/* End of Testing */}
              </td>
              <td className="border p-1" colSpan={1}>
                <Form.Item name="dTd7txVzhgY" className="m-0">
                  <table>
                    <tr>
                      <td></td>
                      <td>
                        <Input
                          readOnly
                          size="large"
                          disabled={
                            store.viewMode || store.allDisabled.dTd7txVzhgY
                          }
                          value={underlyingCauseCode}
                        />
                      </td>
                    </tr>
                  </table>
                </Form.Item>
              </td>
              <td className="border p-1" colSpan={2}>
                <Form.Item name="L97MrANAav9" className="m-0">
                  <Input
                    type="hidden"
                    size="large"
                    disabled={store.viewMode || store.allDisabled.L97MrANAav9}
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={2}>
                <b>
                  {
                    activeLanguage.lang[
                      "Other significant conditions contributing to death (time intervals can be included in brackets after the condition)"
                    ]
                  }
                </b>
              </td>
              <td className="border p-1" colSpan={2}>
                <ICDField
                  id="icdField5"
                  form={form}
                  field="xeE5TQLvucB"
                  codeField="ctbKSNV2cg7"
                  uriField="T4uxg60Lalw"
                />
              </td>
              <td className="border p-1" colSpan={1}>
                <Form.Item name="ctbKSNV2cg7" className="m-0">
                  <Input
                    readOnly={true}
                    size="large"
                    disabled={store.viewMode || store.allDisabled.TRu1GOUwtq5}
                  />
                </Form.Item>
              </td>
              <td className="border p-1" colSpan={2}>
                <Form.Item name="T4uxg60Lalw" className="m-0">
                  <Input
                    type="hidden"
                    size="large"
                    disabled={
                      store.viewMode ||
                      store.allDisabled.T4uxg60Lalw ||
                      altSearchIsDisabled.e
                    }
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Item name="k9xdBQzYMXo" className="m-0">
                  <Input size="large" disabled={store.viewMode} type="hidden" />
                </Form.Item>
              </td>
              <td>
                <Form.Item name="yftBZ5bSEOb" className="m-0">
                  <Input size="large" disabled={store.viewMode} type="hidden" />
                </Form.Item>
              </td>

              <td>
                <Form.Item name="fJUy96o8akn" className="m-0">
                  <Input size="large" disabled={store.viewMode} type="hidden" />
                </Form.Item>
              </td>
              <td>
                <Form.Item name="S53kx50gjQn" className="m-0">
                  <Input size="large" disabled={store.viewMode} type="hidden" />
                </Form.Item>
              </td>

              <td>
                <Form.Item name="cSDJ9kSJkFP" className="m-0">
                  <Input size="large" disabled={store.viewMode} type="hidden" />
                </Form.Item>
              </td>
              <td>
                <Form.Item name="uckvenVFnwf" className="m-0">
                  <Input size="large" disabled={store.viewMode} type="hidden" />
                </Form.Item>
              </td>

              <td>
                <Form.Item name="ZFdJRT3PaUd" className="m-0">
                  <Input size="large" disabled={store.viewMode} type="hidden" />
                </Form.Item>
              </td>

              <td>
                <Form.Item name="Op5pSvgHo1M" className="m-0">
                  <Input size="large" disabled={store.viewMode} type="hidden" />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="my-2 w-full border-collapse px-2">
          <tbody>
            <tr>
              <td
                colSpan={2}
                className="border p-1 text-lg"
                style={{ background: titleBackgroundColor }}
              >
                <h3
                  style={{
                    fontWeight: "bolder",
                    color: "#000085",
                  }}
                >
                  {" "}
                  {activeLanguage.lang["Frame B: Other medical data"]}
                </h3>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>
                  {
                    activeLanguage.lang[
                      "Was surgery performed within the last 4 weeks?"
                    ]
                  }
                </b>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="Kk0hmrJPR90" className="m-0">
                    {optionSet("YN01", "Kk0hmrJPR90", (e: any) => {
                      if (e !== "Yes") {
                        // Disable the relevant fields
                        setDisableFrameB(true);
                        setFrameBKey1(`${parseInt(frameBKey1) + 1}`);
                        setFrameBKey2(`${parseInt(frameBKey2) + 2}`);
                      } else {
                        setDisableFrameB(false);
                        setFrameBKey1(`${parseInt(frameBKey1) + 1}`);
                        setFrameBKey2(`${parseInt(frameBKey2) + 2}`);
                      }
                    })}
                  </Form.Item>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>
                  {activeLanguage.lang["If yes please specify date of surgery"]}
                </b>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="j5TIQx3gHyF"
                  className="m-0"
                  rules={[
                    {
                      type: "object",
                      required: false,
                      message: activeLanguage.lang["Please select date!"],
                    },
                  ]}
                >
                  <DatePicker
                    disabledDate={notTomorrow}
                    size="large"
                    disabled={disableFrameB}
                    key={frameBKey1}
                  />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1">
                <b>
                  {
                    activeLanguage.lang[
                      "If yes please specify reason for surgery (disease or condition)"
                    ]
                  }
                </b>
              </td>
              <td className="border p-1">
                <Form.Item name="JhHwdQ337nn" className="m-0">
                  <Input
                    size="large"
                    disabled={disableFrameB}
                    key={frameBKey2}
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["Was an autopsy requested?"]}</b>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="jY3K6Bv4o9Q" className="m-0">
                    {optionSet("YN01", "jY3K6Bv4o9Q", (e: any) => {
                      console.log("Resetting frameBKey3", frameBKey3);
                      if (e !== "Yes") {
                        setDisableFrameB2(true);
                      } else {
                        setDisableFrameB2(false);
                      }

                      setFrameBKey3(`${parseInt(frameBKey3) + 3}`);
                    })}
                  </Form.Item>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>
                  {
                    activeLanguage.lang[
                      "If yes were the findings used in the certification?"
                    ]
                  }
                </b>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="UfG52s4YcUt" className="m-0">
                    {optionSet(
                      "YN01",
                      "UfG52s4YcUt",
                      (e: any) => {},
                      disableFrameB2,

                      frameBKey3
                    )}
                  </Form.Item>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="my-2 w-full border-collapse px-2">
          <tbody>
            <tr>
              <td
                colSpan={6}
                className="border p-1 text-lg"
                style={{ background: titleBackgroundColor }}
              >
                <h3
                  style={{
                    fontWeight: "bolder",
                    color: "#000085",
                  }}
                >
                  <b>{activeLanguage.lang["Manner of death"]}</b>
                </h3>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>Disease</b>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="FhHPxY16vet"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox
                    disabled={store.viewMode || store.allDisabled.FhHPxY16vet}
                  >
                    {activeLanguage.lang["Yes"]}
                  </Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                <b>{activeLanguage.lang["Assault"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="KsGOxFyzIs1"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox
                    disabled={store.viewMode || store.allDisabled.KsGOxFyzIs1}
                  >
                    {activeLanguage.lang["Yes"]}
                  </Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                <b>{activeLanguage.lang["Could not be determined"]}</b>{" "}
              </td>
              <td className="border p-1">
                <Form.Item
                  name="b4yPk98om7e"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox
                    disabled={store.viewMode || store.allDisabled.b4yPk98om7e}
                  >
                    {activeLanguage.lang["Yes"]}
                  </Checkbox>
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>Accident</b>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="gNM2Yhypydx"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox
                    disabled={store.viewMode || store.allDisabled.gNM2Yhypydx}
                  >
                    {activeLanguage.lang["Yes"]}
                  </Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                <b>{activeLanguage.lang["Legal intervention"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="tYH7drlbNya"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox
                    disabled={store.viewMode || store.allDisabled.tYH7drlbNya}
                  >
                    {activeLanguage.lang["Yes"]}
                  </Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                <b>{activeLanguage.lang["Pending investigation"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="fQWuywOaoN2"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox
                    disabled={store.viewMode || store.allDisabled.fQWuywOaoN2}
                  >
                    {activeLanguage.lang["Yes"]}
                  </Checkbox>
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["Intentional self-harm"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="wX3i3gkTG4m"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox
                    disabled={store.viewMode || store.allDisabled.wX3i3gkTG4m}
                  >
                    {activeLanguage.lang["Yes"]}
                  </Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                <b>{activeLanguage.lang["War"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="xDMX2CJ4Xw3"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox
                    disabled={store.viewMode || store.allDisabled.xDMX2CJ4Xw3}
                  >
                    {activeLanguage.lang["Yes"]}
                  </Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                <b>{activeLanguage.lang["Unknown"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="o1hG9vr0peF"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox
                    disabled={store.viewMode || store.allDisabled.o1hG9vr0peF}
                  >
                    {activeLanguage.lang["Yes"]}
                  </Checkbox>
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={2}>
                <b>{activeLanguage.lang["If external cause or poisoning"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="AZSlwlRAFig"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox
                    disabled={store.viewMode || store.allDisabled.AZSlwlRAFig}
                  >
                    {activeLanguage.lang["Yes"]}
                  </Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                <b>{activeLanguage.lang["Date of injury"]}</b>
              </td>
              <td className="border p-1" colSpan={2}>
                <Form.Item
                  name="U18Tnfz9EKd"
                  className="m-0"
                  rules={[
                    {
                      type: "object",
                      required: false,
                      message:
                        activeLanguage.lang["Please select date of injury"],
                    },
                  ]}
                >
                  <DatePicker
                    disabledDate={notTomorrow}
                    size="large"
                    disabled={store.viewMode || store.allDisabled.U18Tnfz9EKd}
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={3}>
                <b>
                  {
                    activeLanguage.lang[
                      "Please describe how external cause occurred (If poisoning please specify poisoning agent)"
                    ]
                  }
                </b>
              </td>
              <td className="border p-1" colSpan={3}>
                <Form.Item name="DKlOhZJOCrX" className="m-0">
                  <Input
                    size="large"
                    disabled={store.viewMode || store.allDisabled.DKlOhZJOCrX}
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={3}>
                <b>
                  {
                    activeLanguage.lang[
                      "Place of occurrence of the external cause"
                    ]
                  }
                </b>
              </td>
              <td className="border p-1" colSpan={3}>
                <Form.Item name="kGIDD5xIeLC" className="m-0">
                  <Input
                    size="large"
                    disabled={store.viewMode || store.allDisabled.kGIDD5xIeLC}
                  />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="my-2 w-full border-collapse px-2">
          <tbody>
            <tr>
              <td
                colSpan={4}
                className="border p-1 text-lg"
                style={{ background: titleBackgroundColor }}
              >
                <h3
                  style={{
                    fontWeight: "bolder",
                    color: "#000085",
                  }}
                >
                  {activeLanguage.lang["Fetal or infant death"]}
                </h3>
              </td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={2}>
                <b>{activeLanguage.lang["Multiple pregnancy"]}</b>
              </td>
              <td className="border p-1" colSpan={2}>
                {optionSets ? (
                  <Form.Item name="V4rE1tsj5Rb" className="m-0">
                    {optionSet("YN01", "V4rE1tsj5Rb")}
                  </Form.Item>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={2}>
                <b>{activeLanguage.lang["Stillborn?"]}</b>
              </td>
              <td className="border p-1" colSpan={2}>
                {optionSets ? (
                  <Form.Item name="ivnHp4M4hFF" className="m-0">
                    {optionSet("YN01", "ivnHp4M4hFF", (e: any) => {
                      if (e === "Yes") {
                        // Disable the relevant fields
                        setDisableFetal(true);
                        setFetalDisableKey(`${parseInt(fetalDisableKey) + 1}`);
                      } else {
                        setDisableFetal(false);
                        setFetalDisableKey(`${parseInt(fetalDisableKey) + 1}`);
                      }
                    })}
                  </Form.Item>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>
                  {
                    activeLanguage.lang[
                      "If death within 24 hrs specify the number of hours survived"
                    ]
                  }
                </b>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="jf9TogeSZpk"
                  className="m-0"
                  rules={[
                    {
                      type: "number",
                      required: false,
                      message:
                        activeLanguage.lang["Can not be more than 24 hours"],
                      max: 24,
                    },
                  ]}
                >
                  <InputNumber
                    size="large"
                    disabled={disableFetal || personsAge > 1}
                    key={fetalDisableKey}
                  />
                </Form.Item>
              </td>
              <td className="border p-1">
                <b>{activeLanguage.lang["Birth weight (in grams)"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item name="xAWYJtQsg8M" className="m-0">
                  <InputNumber
                    size="large"
                    disabled={store.viewMode || store.allDisabled.xAWYJtQsg8M}
                  />
                </Form.Item>
                {form.getFieldValue("xAWYJtQsg8M") < 100 ||
                form.getFieldValue("xAWYJtQsg8M") > 10000 ? (
                  <span style={{ color: "red" }}>
                    {
                      activeLanguage.lang[
                        "Weight should be between 100 and 1000 grams"
                      ]
                    }
                  </span>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>
                  {
                    activeLanguage.lang[
                      "Number of completed weeks of pregnancy"
                    ]
                  }
                </b>
              </td>
              <td className="border p-1">
                <Form.Item name="lQ1Byr04JTx" className="m-0">
                  <InputNumber
                    size="large"
                    disabled={store.viewMode || store.allDisabled.lQ1Byr04JTx}
                  />
                </Form.Item>
                {form.getFieldValue("lQ1Byr04JTx") < 10 ||
                form.getFieldValue("lQ1Byr04JTx") > 55 ? (
                  <span style={{ color: "red" }}>
                    {
                      activeLanguage.lang[
                        "Completed weeks of death should be between 10 and 54 weeks"
                      ]
                    }
                  </span>
                ) : null}
              </td>
              <td className="border p-1">
                <b>{activeLanguage.lang["Age of mother (years)"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item name="DdfDMFW4EJ9" className="m-0">
                  <InputNumber
                    min={1}
                    size="large"
                    disabled={store.viewMode || store.allDisabled.DdfDMFW4EJ9}
                  />
                </Form.Item>
                {form.getFieldValue("DdfDMFW4EJ9") < 10 ||
                form.getFieldValue("DdfDMFW4EJ9") > 60 ? (
                  <span style={{ color: "orange" }}>
                    {
                      activeLanguage.lang[
                        "Mothers age is not between 10 and 60 years"
                      ]
                    }
                  </span>
                ) : null}
              </td>
            </tr>

            <tr>
              <td className="border p-1" colSpan={2}>
                <b>
                  {
                    activeLanguage.lang[
                      "If the death was perinatal, please state conditions of mother that affected the fetus and newborn"
                    ]
                  }
                </b>{" "}
              </td>
              <td className="border p-1" colSpan={2}>
                <Form.Item name="GFVhltTCG8b" className="m-0">
                  <Input
                    size="large"
                    disabled={store.viewMode || store.allDisabled.GFVhltTCG8b}
                  />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="my-2 w-full border-collapse px-2">
          <tbody>
            <tr>
              <td
                className="border p-1 text-lg"
                style={{ background: titleBackgroundColor }}
              >
                <h3
                  style={{
                    fontWeight: "bolder",
                    color: "#000085",
                  }}
                >
                  <b>
                    {
                      activeLanguage.lang[
                        "For women, was the deceased pregnant or within 6 weeks of delivery?"
                      ]
                    }
                  </b>
                  {showPregnancyReminder && personsGender === "Female" && (
                    <Alert
                      message={activeLanguage.lang["Reminder"]}
                      description={
                        activeLanguage.lang[
                          "Please Remember to fill in the section: For women, was the deceased pregnant or within 6 weeks of delivery?"
                        ]
                      }
                      type="error"
                      closable
                      showIcon
                      onClose={() => {
                        setShowPregnancyReminder(false);
                      }}
                    />
                  )}
                </h3>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="zcn7acUB6x1" className="m-0">
                    {optionSet(
                      "YN01",
                      "zcn7acUB6x1",
                      (e: any) => {
                        console.log("E is ", e);
                        if (e === "Yes") {
                          // console.log("Setting pregnancy to true");
                          refreshAllPregnantKeys(true);
                        } else {
                          // console.log("Setting pregnancy to false");
                          refreshAllPregnantKeys(false);
                        }
                      },
                      !enablePregnantQn,
                      enablePregnantQnKey
                    )}
                  </Form.Item>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["At what point?"]}</b>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="KpfvNQSsWIw" className="m-0">
                    {optionSet(
                      "100ATPOINT",
                      "KpfvNQSsWIw",
                      () => {},
                      !womanWasPregnant,
                      pregnantKey1
                    )}
                  </Form.Item>
                ) : null}
              </td>
            </tr>

            <tr>
              <td className="border p-1">
                <b>
                  {
                    activeLanguage.lang[
                      "Did the pregnancy contribute to death?"
                    ]
                  }
                </b>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="AJAraEcfH63" className="m-0">
                    {optionSet(
                      "YN01",
                      "AJAraEcfH63",
                      () => {},
                      !womanWasPregnant,
                      pregnantKey2
                    )}
                  </Form.Item>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["Referred from (level of care)"]}</b>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="RJhbkjYrODG" className="m-0">
                    {optionSet(
                      "100RefLevels",
                      "RJhbkjYrODG",
                      () => {},
                      !womanWasPregnant,
                      pregnantKey3
                    )}
                  </Form.Item>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["Parity"]}</b>
              </td>
              <td className="border p-1">
                <Form.Item name="ymyLrfEcYkD" className="m-0">
                  <Input
                    size="large"
                    disabled={
                      store.viewMode ||
                      store.allDisabled.ymyLrfEcYkD ||
                      !womanWasPregnant
                    }
                    key={pregnantKey4}
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["Mode of delivery"]}</b>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="K5BDPJQk1BP" className="m-0">
                    {optionSet(
                      "MD01",
                      "K5BDPJQk1BP",
                      () => {},
                      !womanWasPregnant,
                      pregnantKey5
                    )}
                  </Form.Item>
                ) : null}
              </td>
            </tr>

            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["Place of delivery"]}</b>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="Z41di0TRjIu" className="m-0">
                    {optionSet(
                      "PD01",
                      "Z41di0TRjIu",
                      () => {},
                      !womanWasPregnant,
                      pregnantKey6
                    )}
                  </Form.Item>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                <b>{activeLanguage.lang["Delivered by skilled attendant"]}</b>
              </td>
              <td className="border p-1">
                {optionSets ? (
                  <Form.Item name="uaxjt0inPNF" className="m-0">
                    {optionSet(
                      "YN01",
                      "uaxjt0inPNF",
                      () => {},
                      !womanWasPregnant,
                      pregnantKey7
                    )}
                  </Form.Item>
                ) : null}
              </td>
            </tr>

            <tr>
              <Declarations
                titleBackgroundColor={titleBackgroundColor}
                receiveOutput={handleDeclarationOutput}
                receiveOldData={declarationsDefault}
              />
            </tr>
          </tbody>
        </table>
      </Card>
    </Form>
  );
});
