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
    "1,000,000", "500,000", "250,000", "125,000", "64,000", 
    "32,000", "16,000", "8,000", "4,000", "2,000", 
    "1,000", "500", "300", "200", "100"
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
      <div className="flex space-x-4 mb-4">
        <button 
          onClick={useFiftyFifty} 
          disabled={usedLifelines.fifty}
          className={`p-2 rounded-full ${usedLifelines.fifty ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          title="50:50">
          <div className="text-xs font-bold">50:50</div>
        </button>
        
        <button 
          onClick={useAudienceHelp} 
          disabled={usedLifelines.audience}
          className={`p-2 rounded-full ${usedLifelines.audience ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          title="Помощь зала">
          <Users size={18} />
        </button>
        
        <button 
          onClick={usePhoneAFriend} 
          disabled={usedLifelines.phone}
          className={`p-2 rounded-full ${usedLifelines.phone ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          title="Звонок другу">
          <Phone size={18} />
        </button>
      </div>
    );
  };

  const renderMoneyTree = () => {
    return (
      <div className="hidden md:block w-32 bg-blue-900 text-white p-2 rounded">
        <h3 className="text-center font-bold mb-2">Сумма</h3>
        <ul className="text-xs">
          {moneyTree.map((sum, index) => (
            <li 
              key={index} 
              className={`p-1 ${index === currentQuestion ? 'bg-yellow-500 text-black font-bold' : ''} ${index < currentQuestion ? 'bg-green-700' : ''}`}
            >
              {index + 1}. {sum} $
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
      <div className="mt-4 p-4 bg-yellow-100 rounded">
        <p className="font-bold">Ваш друг думает, что правильный ответ:</p>
        <p>"{String.fromCharCode(65 + answer)}" - {questions[currentQuestion].options[answer]}</p>
        <p className="text-gray-600 italic">(Но не забывайте, что друг не всегда знает правильный ответ!)</p>
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
      <div className="flex flex-col items-center justify-center p-6 bg-blue-900 text-white min-h-64 rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-4">Игра окончена!</h2>
          {correctAnswer && currentQuestion === questions.length - 1 ? (
            <>
              <Award size={64} className="mx-auto mb-4 text-yellow-400" />
              <p className="text-2xl mb-2">Поздравляем! Вы выиграли</p>
              <p className="text-4xl font-bold text-yellow-400">${moneyTree[currentQuestion]}</p>
            </>
          ) : (
            <>
              <DollarSign size={48} className="mx-auto mb-4" />
              <p className="mb-2">Ваш выигрыш:</p>
              <p className="text-2xl font-bold">${currentWinnings}</p>
            </>
          )}
        </div>
        <button 
          onClick={restartGame}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Начать заново
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 bg-blue-800 text-white p-6 rounded-lg">
        <div className="mb-2 text-yellow-300 text-xl font-bold">
          Вопрос {currentQuestion + 1} - ${moneyTree[currentQuestion]}
        </div>
        
        {renderLifelines()}
        
        <div className="mb-6">
          <h2 className="text-xl mb-4">{questions[currentQuestion].question}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showExplanation && setSelectedOption(index)}
                disabled={showExplanation || removedOptions.includes(index)}
                className={`p-3 rounded text-left ${
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
            <div className="mt-4 p-3 bg-white text-black rounded">
              <h3 className="font-bold mb-2">Помощь зала:</h3>
              <div className="flex items-end h-32 gap-1">
                {audienceHelp.map((percent, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-blue-500" 
                      style={{height: `${percent}%`}}
                    ></div>
                    <div className="mt-1 text-xs">
                      {String.fromCharCode(65 + index)}: {percent}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {usedLifelines.phone && !showExplanation && renderPhoneFriendAnswer()}
          
          {showExplanation && (
            <div className="mt-4 p-3 bg-white text-black rounded">
              <div className="flex items-center mb-2">
                {correctAnswer ? (
                  <>
                    <Check className="text-green-600 mr-2" />
                    <span className="font-bold">Правильно!</span>
                  </>
                ) : (
                  <>
                    <X className="text-red-600 mr-2" />
                    <span className="font-bold">Неправильно!</span>
                  </>
                )}
              </div>
              <p>{questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-center space-x-4">
          {!showExplanation ? (
            <button
              onClick={checkAnswer}
              disabled={selectedOption === null}
              className={`px-6 py-2 rounded ${
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
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded"
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