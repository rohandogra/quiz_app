import React, { useState } from 'react'
import { Input, Button, Steps, Modal } from "antd";
import { Formik, Field, ErrorMessage, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { createQuiz, addQuestions } from '../redux/actions/quizAction'
import './form.scss'
import { useHistory } from 'react-router-dom';

const validationSchemaTop = Yup.object().shape({
    title: Yup.string().required("Required"),
});

const validationSchemaBottom = Yup.object().shape({
    question: Yup.string().required("Required"),
    incorrect_answers: Yup.array()
        .required('Must have Incorrect answers') // these constraints are shown if and only if inner constraints are satisfied
        .min(2, 'Minimum of 3 Incorrect answers Required'),
    quiz_id: Yup.string().required("Required"),
    correct_answer: Yup.string().required("Required"),
})
const { Step } = Steps;

const steps = [
    {
        title: 'Enter Quiz Name',
        content: 'First-content',
    },
    {
        title: 'Enter Question',
        content: 'Second-content',
    }
];


function QuizCreate(props) {

    const history = useHistory(null)

    const handleComplete = () => {
        Modal.confirm({
            title: "you are about to leave this page!!",
            // content: "Bla bla ...",
            okText: "Ok",
            cancelText: "Cancle",
            onOk: () => {
                history.push('/')
            },
        })
    }

    const [current, setCurrent] = useState(0)
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    return (
        <div className='form-container row'>
            <Steps type='navigation' current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <Formik
                initialValues={{
                    title: props.quizData.title || ""
                }}
                validationSchema={validationSchemaTop}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    props.createQuiz(values)
                    setCurrent(prev => prev + 1)
                }}
            >
                {() => (
                    <Form className='col-6' >
                        <div className="form__inputContainer-top">
                            <label>Quiz Name</label>
                            <div className="form__input">
                                <Field
                                    name="title"
                                    className="form__inputr"
                                    placeholder="Enter Quiz Name"
                                    type="text"
                                    as={Input}
                                />
                                <ErrorMessage
                                    name="title"
                                    render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>}
                                />
                            </div>
                            <div className="form__btn ml-1">
                                <Button className={current === 1 ? "d-none" : ""} htmlType="submit" type='primary'>
                                    Next
                            </Button>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
            {isEmpty(props.quizData) ? <div className='pl-5'> <h2>Enter Quiz Name!</h2> </div> :
                <Formik
                    initialValues={{
                        question: "",
                        quiz_id: props.quizData._id,
                        correct_answer: "",
                        incorrect_answers: [""]
                    }}
                    validationSchema={validationSchemaBottom}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values)
                        props.addQuestions(values)
                        resetForm();
                    }}
                >
                    {({ values }) => (
                        <Form className='col-6 '>
                            <div className="form__inputContainer">
                                <label>Question</label>
                                <div className="form__input">
                                    <Field
                                        name="question"
                                        className="form__inputr"
                                        placeholder="Enter Question"
                                        type="text"
                                        as={Input}
                                    />
                                    <ErrorMessage
                                        name="question"
                                        render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>}
                                    />
                                </div>
                            </div>
                            <div className="form__inputContainer">
                                <label>Correct Answer</label>
                                <div className="form__input">
                                    <Field
                                        name="correct_answer"
                                        className="form__inputr"
                                        placeholder="Enter Correct Answer"
                                        type="text"
                                        as={Input}
                                    />
                                    <ErrorMessage
                                        name="title"
                                        render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>}
                                    />
                                </div>
                            </div>
                            <div className="form__inputContainer">
                                <label >Incorrect Answers</label>
                                <div >
                                    <FieldArray
                                        name="incorrect_answers"
                                        render={arrayHelpers => (
                                            <div >
                                                {values.incorrect_answers && values.incorrect_answers.length > 0 ? (
                                                    values.incorrect_answers.map((_, index) => (
                                                        <div className='' key={index}>
                                                            <Field className='mt-2 mr-1' name={`incorrect_answers.${index}`} as={Input} placeholder="Enter a Incorrect Answer" />
                                                            <Button
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                                className='mt-2 mr-1'
                                                            >
                                                                -
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                onClick={() => arrayHelpers.insert(index, '')}
                                                                className='mt-2'
                                                            >
                                                                +
                                                        </Button>

                                                            {/* <ErrorMessage name={`incorrect_answers.${index}`} render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>} /> */}
                                                            <ErrorMessage
                                                                name={`incorrect_answers.${index}`}
                                                                component="div"
                                                                className="field-error"
                                                            />

                                                        </div>

                                                    ))
                                                ) : (
                                                        <Button className='mt-1' type="button" onClick={() => arrayHelpers.push('')}>
                                                            Add Incorrect Answer
                                                        </Button>
                                                    )}
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="form__btn">
                                <Button htmlType="submit" type='primary'>
                                    Add Question
                                </Button>
                                <Button className='ml-3' onClick={handleComplete}>
                                    Complete
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>

            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    quizData: state.quiz.quizData
})

export default connect(mapStateToProps, { createQuiz, addQuestions })(QuizCreate)