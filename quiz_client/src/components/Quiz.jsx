import React, { useState, useEffect } from 'react'
import { Steps, Button, Radio, Modal } from 'antd';
import './quiz.scss'
import { connect } from 'react-redux';
import { getQuiz, getSelectedQuiz } from '../redux/actions/quizAction'
import Select from './utility/Select';
import { useHistory } from 'react-router-dom';

const Quiz = (props) => {
    const { Step } = Steps;
    const [current, setCurrent] = useState(0)
    const [score, setScore] = useState(0)
    const history = useHistory(null)
    const [value3, setValue] = useState()

    useEffect(() => {
        props.getQuiz()
    }, [])

    const onChange = (value) => {
        props.getSelectedQuiz(value)
    }
    const all_answers = props?.selectedQuiz?.map(ele => ele.all_answers.map(ele => ({ label: ele, value: ele })))

    const shuffle = () => {
        const ans = props?.selectedQuiz && props?.selectedQuiz?.map(ele => ele.all_answers)
        props?.selectedQuiz && ans[current].sort(function () {
            return Math.random() - .5;
        });
    }

    shuffle()

    const onChange3 = (e) => {
        setValue(e.target.value)
        const correctAnswer = props?.selectedQuiz?.map(ele => ele.correct_answer)

        current < props?.selectedQuiz?.length - 1 && setCurrent(prev => prev + 1)
        if (e.target.value === correctAnswer[current]) {
            setScore(prev => prev + 1)
        }
        current < props?.selectedQuiz?.length - 1 && setValue(e.target.current)
    }

    const scoreData = (
        <div className='score_container'>
            <h2>Score</h2>
            <span>{`${score} / ${props?.selectedQuiz?.length}`}</span>
        </div>
    )

    const handleDone = () => {
        Modal.confirm({
            title: scoreData,
            okText: "Ok",
            cancelText: "Cancle",
            onOk: () => {
                setCurrent(0)
                setScore(0)
                setValue("")
                history.push('/')
            },
        })

    }

    return (
        <>
            <div className='select_container'>
                <Select data={props.quiz} onChange={onChange} />
            </div>
            {props?.selectedQuiz && <Steps current={current}>
                {props?.selectedQuiz?.map(item => (
                    <Step key={item.question} title={`Question`} />
                ))}

            </Steps>}
            <div className="steps-content">
                <div className="steps_contailer">
                    <div className='question_heading'>{props?.selectedQuiz && props?.selectedQuiz[current]?.question}</div>
                    <div className="radio_container">
                        {props?.selectedQuiz &&
                            <div>
                                <Radio.Group
                                    options={all_answers[current]}
                                    onChange={onChange3}
                                    value={value3}
                                    optionType="button"
                                    disabled={value3 ? true : false}
                                />
                            </div>}
                    </div>
                </div>
            </div>
            <div className=' select_container mt-5'>
                {current === props?.selectedQuiz?.length - 1 && value3 !== undefined && (
                    <Button type="primary" onClick={handleDone}>
                        Done
                    </Button>
                )}
            </div>
        </>
    )

}
const mapStateToProps = state => ({
    quiz: state.quiz.quiz,
    selectedQuiz: state.quiz.selectedQuiz.question,
})



export default connect(mapStateToProps, { getQuiz, getSelectedQuiz })(Quiz)
