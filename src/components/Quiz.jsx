import React, { useState } from 'react';
import { Award, DollarSign, Phone, Users, X, Check, HelpCircle } from 'lucide-react';

const Quiz = () => {
  const questions = [
    {
      question: "Какой закон правда существует в США:",
      options: [
        "В Алабаме запрещено носить мороженое в заднем кармане",
        "В Аризоне запрещено класть спать осла в ванной",
        "В городе Мэнвилл в Нью-Джерси запрещено предлагать сигареты и алкоголь животным в зоопарке",
        "Все перечисленное"
      ],
      correctAnswer: 3, // индекс правильного ответа (начиная с 0)
      explanation: "Действительно, все эти странные законы существуют в США!"
    },
    {
      question: "Кто был губернатором штата Калифорния в начале 2000-х?",
      options: [
        "Терминатор",
        "Конан Варвар",
        "Иван Данко",
        "Арнольд Шварцнеггер"
      ],
      correctAnswer: [0, 1, 2, 3], // все ответы правильные
      explanation: "Все ответы правильные! Первые три варианта - это роли Арнольда Шварцнеггера, который действительно был губернатором Калифорнии с 2003 по 2011 год."
    },
    {
      question: "Янки и Дикси это:",
      options: [
        "Популярные сети продуктовых магазинов",
        "Известные породы крокодилов в Луизиане",
        "Жители севера и юга США",
        "Модели пикапов форд"
      ],
      correctAnswer: 2,
      explanation: "Янки - это неформальное название жителей северных штатов, а Дикси - южных штатов США."
    }
  ];

  const moneyTree = [
    "3,000,000", "1,500,000", "800,000", "400,000", "200,000", 
    "100,000", "50,000", "25,000", "15,000", "10,000", 
    "5,000", "3,000", "2,000", "1,000", "500"
  ].reverse();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [usedLifelines, setUsedLifelines] = useState({
    fifty: false,
    audience: false,
    phone: false
  });
  const [removedOptions, setRemovedOptions] = useState([]);
  const [audienceHelp, setAudienceHelp] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [currentWinnings, setCurrentWinnings] = useState("0");

  const checkAnswer = () => {
    const current = questions[currentQuestion];
    
    // Проверяем, является ли ответ правильным
    let isCorrect = false;
    if (Array.isArray(current.correctAnswer)) {
      isCorrect = current.correctAnswer.includes(selectedOption);
    } else {
      isCorrect = selectedOption === current.correctAnswer;
    }
    
    setCorrectAnswer(isCorrect);
    setShowExplanation(true);
    
    if (isCorrect) {
      setCurrentWinnings(moneyTree[currentQuestion]);
    } else {
      setGameOver(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setRemovedOptions([]);
      setAudienceHelp(null);
    } else {
      setGameOver(true);
    }
  };

  const useFiftyFifty = () => {
    if (usedLifelines.fifty) return;
    
    const current = questions[currentQuestion];
    let correctIndex;
    
    if (Array.isArray(current.correctAnswer)) {
      correctIndex = current.correctAnswer[0]; // Берем первый правильный ответ
    } else {
      correctIndex = current.correctAnswer;
    }
    
    let toRemove = [];
    let count = 0;
    
    while (count < 2) {
      const randomIndex = Math.floor(Math.random() * 4);
      if (randomIndex !== correctIndex && !toRemove.includes(randomIndex)) {
        toRemove.push(randomIndex);
        count++;
      }
    }
    
    setRemovedOptions(toRemove);
    setUsedLifelines({...usedLifelines, fifty: true});
  };

  const useAudienceHelp = () => {
    if (usedLifelines.audience) return;
    
    const current = questions[currentQuestion];
    let correctIndex;
    
    if (Array.isArray(current.correctAnswer)) {
      correctIndex = current.correctAnswer[0]; // Берем первый правильный ответ
    } else {
      correctIndex = current.correctAnswer;
    }
    
    // Генерируем правдоподобное распределение голосов
    let votes = [10, 20, 25, 45];
    
    // Перемешиваем, но делаем так, чтобы правильный ответ получил больше голосов
    votes = votes.map((vote, index) => {
      if (removedOptions.includes(index)) return 0;
      return vote;
    });
    
    let temp = votes[correctIndex];
    votes[correctIndex] = votes[3];
    votes[3] = temp;
    
    // Нормализуем, чтобы сумма была 100%
    const sum = votes.reduce((a, b) => a + b, 0);
    votes = votes.map(vote => Math.round((vote / sum) * 100));
    
    // Корректируем, чтобы сумма была ровно 100%
    const adjustedSum = votes.reduce((a, b) => a + b, 0);
    if (adjustedSum !== 100) {
      votes[correctIndex] += 100 - adjustedSum;
    }
    
    setAudienceHelp(votes);
    setUsedLifelines({...usedLifelines, audience: true});
  };

  const usePhoneAFriend = () => {
    if (usedLifelines.phone) return;
    setUsedLifelines({...usedLifelines, phone: true});
  };

  const renderLifelines = () => {
    return (
      <div className="flex space-x-4 mb-3 justify-center">
        <button 
          onClick={useFiftyFifty} 
          disabled={usedLifelines.fifty}
          className={`p-2 rounded-full ${usedLifelines.fifty ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          title="50:50">
          <div className="text-xl font-bold">50:50</div>
        </button>
        
        <button 
          onClick={useAudienceHelp} 
          disabled={usedLifelines.audience}
          className={`p-2 rounded-full ${usedLifelines.audience ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          title="Помощь зала">
          <Users size={24} />
        </button>
        
        <button 
          onClick={usePhoneAFriend} 
          disabled={usedLifelines.phone}
          className={`p-2 rounded-full ${usedLifelines.phone ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          title="Звонок другу">
          <Phone size={24} />
        </button>
      </div>
    );
  };

  const renderMoneyTree = () => {
    return (
      <div className="hidden md:block w-56 bg-blue-900 text-white p-3 rounded-lg overflow-auto">
        <h3 className="text-left font-bold mb-2 text-xl">Сумма</h3>
        <ul className="text-xl">
          {moneyTree.map((sum, index) => (
            <li 
              key={index} 
              className={`p-1 mb-1 rounded text-left ${index === currentQuestion ? 'bg-yellow-500 text-black font-bold' : ''} ${index < currentQuestion ? 'bg-green-700' : ''}`}
            >
              {index + 1}. {sum} руб.
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderPhoneFriendAnswer = () => {
    const current = questions[currentQuestion];
    let friendAnswer;
    
    if (Array.isArray(current.correctAnswer)) {
      friendAnswer = current.correctAnswer[0];
    } else {
      friendAnswer = current.correctAnswer;
    }
    
    // 70% шанс, что друг даст правильный ответ
    const isCorrect = Math.random() < 0.7;
    let answer;
    
    if (isCorrect) {
      answer = friendAnswer;
    } else {
      // Выбираем случайный неправильный ответ
      let incorrect;
      do {
        incorrect = Math.floor(Math.random() * 4);
      } while (incorrect === friendAnswer || removedOptions.includes(incorrect));
      answer = incorrect;
    }
    
    return (
      <div className="mt-2 p-3 bg-yellow-100 rounded-lg overflow-auto">
        <p className="font-bold text-xl mb-1">Ваш друг думает, что правильный ответ:</p>
        <p className="text-xl mb-1">"{String.fromCharCode(65 + answer)}" - {questions[currentQuestion].options[answer]}</p>
        <p className="text-gray-600 italic text-xl">(Но не забывайте, что друг не всегда знает правильный ответ!)</p>
      </div>
    );
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setGameOver(false);
    setUsedLifelines({fifty: false, audience: false, phone: false});
    setRemovedOptions([]);
    setAudienceHelp(null);
    setCurrentWinnings("0");
  };

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-blue-900 text-white h-full rounded-lg w-full overflow-auto">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold mb-3">Игра окончена!</h2>
          {correctAnswer && currentQuestion === questions.length - 1 ? (
            <>
              <Award size={64} className="mx-auto mb-3 text-yellow-400" />
              <p className="text-xl mb-2">Поздравляем! Вы выиграли</p>
              <p className="text-xl font-bold text-yellow-400">{moneyTree[currentQuestion]} руб.</p>
            </>
          ) : (
            <>
              <DollarSign size={64} className="mx-auto mb-3" />
              <p className="text-xl mb-2">Ваш выигрыш:</p>
              <p className="text-xl font-bold">{currentWinnings} руб.</p>
            </>
          )}
        </div>
        <button 
          onClick={restartGame}
          className="mt-3 px-6 py-2 text-xl bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Начать заново
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full h-full overflow-hidden">
      <div className="flex-1 bg-blue-800 text-white p-4 rounded-lg flex flex-col overflow-hidden">
        <div className="text-yellow-300 text-xl font-bold text-left mb-2">
          Вопрос {currentQuestion + 1} - {moneyTree[currentQuestion]} руб.
        </div>
        
        {renderLifelines()}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <h2 className="text-xl mb-4 font-bold text-left">{questions[currentQuestion].question}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showExplanation && setSelectedOption(index)}
                disabled={showExplanation || removedOptions.includes(index)}
                className={`p-3 rounded-lg text-left text-xl ${
                  removedOptions.includes(index) ? 'opacity-0 cursor-default' :
                  selectedOption === index 
                    ? showExplanation 
                      ? (Array.isArray(questions[currentQuestion].correctAnswer) 
                          ? questions[currentQuestion].correctAnswer.includes(index) 
                            ? 'bg-green-600' 
                            : 'bg-red-600' 
                          : index === questions[currentQuestion].correctAnswer 
                            ? 'bg-green-600' 
                            : 'bg-red-600')
                      : 'bg-blue-600 hover:bg-blue-500' 
                    : showExplanation 
                      ? (Array.isArray(questions[currentQuestion].correctAnswer) 
                          ? questions[currentQuestion].correctAnswer.includes(index) 
                            ? 'bg-green-600' 
                            : 'bg-blue-900' 
                          : index === questions[currentQuestion].correctAnswer 
                            ? 'bg-green-600' 
                            : 'bg-blue-900')
                      : 'bg-blue-900 hover:bg-blue-700'
                }`}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + index)}:</span> {option}
              </button>
            ))}
          </div>
          
          {audienceHelp && (
            <div className="mt-2 p-3 bg-white text-black rounded-lg overflow-auto">
              <h3 className="font-bold mb-2 text-xl">Помощь зала:</h3>
              <div className="flex items-end h-32 gap-2">
                {audienceHelp.map((percent, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-blue-500" 
                      style={{height: `${percent}%`}}
                    ></div>
                    <div className="mt-1 text-xl">
                      {String.fromCharCode(65 + index)}: {percent}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {usedLifelines.phone && !showExplanation && renderPhoneFriendAnswer()}
          
          {showExplanation && (
            <div className="mt-2 p-3 bg-white text-black rounded-lg overflow-auto">
              <div className="flex items-center mb-2">
                {correctAnswer ? (
                  <>
                    <Check className="text-green-600 mr-2" size={24} />
                    <span className="font-bold text-xl">Правильно!</span>
                  </>
                ) : (
                  <>
                    <X className="text-red-600 mr-2" size={24} />
                    <span className="font-bold text-xl">Неправильно!</span>
                  </>
                )}
              </div>
              <p className="text-xl">{questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-center space-x-4 mt-3">
          {!showExplanation ? (
            <button
              onClick={checkAnswer}
              disabled={selectedOption === null}
              className={`px-6 py-2 rounded-lg text-xl ${
                selectedOption === null 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Ответить
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-xl"
            >
              {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Завершить игру'}
            </button>
          )}
        </div>
      </div>
      
      {renderMoneyTree()}
    </div>
  );
};

export default Quiz; 