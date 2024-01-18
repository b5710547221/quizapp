import React, { useState, useEffect } from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet
} from 'react-native';
 
import { quizData } from './quizData'
function shuffle(o: any){ 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] =
        useState(shuffle(quizData)[0]);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] =
        useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [choice, setChoice] = useState(shuffle(quizData[0].options))
    const [count, setCount] = useState(1);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
               
                   
                        setCurrentQuestion(shuffle(quizData)[0]);
                        setChoice(shuffle(quizData[0].options));
                        setTimeLeft(10);
                        setCount(count+1);
                        if(count==20) {
                         setQuizCompleted(true);
                         
                        }
               
            }
        }, 1000);
 
        return () => clearTimeout(timer);
    }, [currentQuestion, timeLeft]);
 
    const handleAnswer = (selectedOption: any) => {
        if (selectedOption ===
            currentQuestion?.correctAnswer) {
            setScore(score + 1);
        }
 
        setCurrentQuestion(shuffle(quizData)[0]);
        setChoice(shuffle(quizData[0].options));
        setTimeLeft(10);
        setCount(count+1);
        
        if(count==20) {
         setQuizCompleted(true);
         
        }
    };
 
    const handleRetest = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizCompleted(false);
        setTimeLeft(10);
    };
    // Display questions and answers when the quiz is completed
    const displayAnswers =
        quizData.map((question, index) => (
            <View key={index}>
                <Text style={styles.question}>
                    Question {index + 1}:
                    {quizData[index].question}
                </Text>
                <Text style={styles.correctAnswer}>
                    Correct Answer:
                    {quizData[index].correctAnswer}
                </Text>
 
            </View>
        ));
 
    return (
        <View style={styles.container}>
            {quizCompleted ? (
                <View>
                    <Text style={styles.score}>
                        Your Score: {score}
                    </Text>
                    <Text style={styles.question}>
                        Questions and Answers:
                    </Text>
                    {displayAnswers}
                    <TouchableOpacity
                        style={styles.retestButton}
                        onPress={handleRetest}>
                        <Text style={styles.buttonText}>
                            Retest
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text style={styles.question}>
                        {currentQuestion?.question}
                    </Text>
                    <Text style={styles.timer}>
                        Time Left: {timeLeft} sec
                    </Text>
                    {currentQuestion
                        ?.options.map((option: any, index:any) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.option}
                                onPress={() => handleAnswer(option)}
                            >
                                <Text style={styles.buttonText}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                </View>
            )}
        </View>
    );
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    option: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    retestButton: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
    },
    timer: {
        fontSize: 11,
        fontWeight: 'bold',
        backgroundColor: 'yellow',
        paddingVertical: 11,
        marginRight: 120,
        borderRadius: 12,
 
    },
    correctAnswer: {
        color: 'green',
    },
 
});
export default Quiz;