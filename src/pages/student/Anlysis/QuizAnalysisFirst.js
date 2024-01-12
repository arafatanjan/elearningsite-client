import React from 'react';
import QuizAnalysisSecond from './QuizAnalysisSecond';
import QuizAnalysisThird from './QuizAnalysisThird';
import QuizAnalysisFifth from './QuizAnalysisFifth';
import QuizAnalysisSixth from './QuizAnalysisSixth';

const QuizAnalysisFirst = () => {
    return (
        <div>
            <QuizAnalysisSecond/>
            <br/>
            <br/>
               <QuizAnalysisThird/>   
             {/* <QuizAnalysisFifth/> */}
             <QuizAnalysisSixth/>
             
        </div>
    );
};

export default QuizAnalysisFirst;