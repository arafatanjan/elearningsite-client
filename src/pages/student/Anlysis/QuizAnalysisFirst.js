import React from 'react';
import QuizAnalysisSecond from './QuizAnalysisSecond';
import QuizAnalysisThird from './QuizAnalysisThird';
import QuizAnalysisFifth from './QuizAnalysisFifth';
import QuizAnalysisSixth from './QuizAnalysisSixth';
import QuizAnalysisSeventh from './QuizAnalysisSeventh';
import QuizAnalysisEighth from './QuizAnalysisEighth';

const QuizAnalysisFirst = () => {
    return (
        <div>
            <QuizAnalysisSecond/>
            <br/>
            <br/>
               <QuizAnalysisThird/>   
             {/* <QuizAnalysisFifth/> */}
             <br/>
            <br/>
             <QuizAnalysisSixth/>
             <br/>
            <br/>
             <QuizAnalysisSeventh/>
             <br/>
            <br/>
             <QuizAnalysisEighth/>
             
        </div>
    );
};

export default QuizAnalysisFirst;