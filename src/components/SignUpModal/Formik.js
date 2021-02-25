import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ButtonNormalBig } from "../button";
// import { Debug } from "./Debug";

import styled from "styled-components";

const FormWrapper = styled.div`
    height: 100%;
    width: 340px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Name = styled.div`
    display: flex;
    gap: 10px;
    @media screen and (max-width: 525px) {
        flex-direction: column;
    }
`;
const CustomField = styled(Field)`
    border: 1px solid rgba(112, 112, 112, 1);
    border-radius: 2px;
    height: 48px;
    opacity: 0.57;
    padding: 14px;
    margin: 12px 0;
    font: normal normal normal 16px/21px Segoe UI;
    letter-spacing: 0px;
    color: #000000;
    opacity: 0.5;
`;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.
const Wizard = ({ children, initialValues, onSubmit }) => {
    const [stepNumber, setStepNumber] = useState(0);
    const steps = React.Children.toArray(children);
    const [snapshot, setSnapshot] = useState(initialValues);

    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;

    const next = (values) => {
        setSnapshot(values);
        setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
    };

    const previous = (values) => {
        setSnapshot(values);
        setStepNumber(Math.max(stepNumber - 1, 0));
    };

    const handleSubmit = async (values, bag) => {
        if (step.props.onSubmit) {
            await step.props.onSubmit(values, bag);
        }
        if (isLastStep) {
            return onSubmit(values, bag);
        } else {
            bag.setTouched({});
            next(values);
        }
    };

    return (
        <Formik
            initialValues={snapshot}
            onSubmit={handleSubmit}
            validationSchema={step.props.validationSchema}
        >
            {(formik) => (
                <Form>
                    {step}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {stepNumber > 0 && (
                            <button onClick={() => previous(formik.values)} type="button">
                                Back
                            </button>
                        )}
                        <div>
                            <ButtonNormalBig disabled={formik.isSubmitting} type="submit">
                                {isLastStep ? "Submit" : "Sign Up"}
                            </ButtonNormalBig>
                        </div>
                    </div>
                    {/* <Debug /> */}
                </Form>
            )}
        </Formik>
    );
};

const WizardStep = ({ children }) => children;

const App = () => (
    <FormWrapper>
        <Wizard
            initialValues={{
                email: "",
                firstName: "",
                lastName: "",
                password: "",
                otp: "",
            }}
            onSubmit={async (values) => sleep(300).then(() => console.log("Wizard submit", values))}
        >
            <WizardStep
                onSubmit={() => console.log("Step1 onSubmit")}
                // validationSchema={Yup.object({
                //     firstName: Yup.string().required("required"),
                //     lastName: Yup.string().required("required"),
                //     email: Yup.string().email("Invalid email address").required("required"),
                //     password: Yup.string().required("required"),
                // })}
            >
                <h1>Sign Up</h1>
                <p>It's quick and easy.</p>
                <Name>
                    <CustomField
                        style={{ width: "100%" }}
                        autoComplete="given-name"
                        component="input"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        type="text"
                    />
                    <ErrorMessage className="error" component="div" name="firstName" />
                    <CustomField
                        style={{ width: "100%" }}
                        autoComplete="family-name"
                        component="input"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        type="text"
                    />
                    <ErrorMessage className="error" component="div" name="lastName" />
                </Name>
                <div>
                    <CustomField
                        style={{ width: "100%" }}
                        autoComplete="email"
                        component="input"
                        id="email"
                        name="email"
                        placeholder="Email"
                        type="text"
                    />
                    <ErrorMessage className="error" component="div" name="email" />
                </div>
                <div>
                    <CustomField
                        style={{ width: "100%" }}
                        component="input"
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                    />
                    <ErrorMessage className="error" component="div" name="password" />
                </div>
            </WizardStep>
            <WizardStep
                onSubmit={() => console.log("Step2 onSubmit")}
                validationSchema={Yup.object({
                    OTP: Yup.string().required("required"),
                })}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <label htmlFor="email">OTP Sent!</label>
                    <CustomField
                        // style={{ borderRadius: "32px", width: "336px"}}
                        component="input"
                        id="otp"
                        name="otp"
                        placeholder="Enter your OTP"
                        type="text"
                    />
                    <ErrorMessage className="error" component="div" name="otp" />
                    <label htmlFor="email">details</label>
                </div>
            </WizardStep>
        </Wizard>
    </FormWrapper>
);

export default App;
