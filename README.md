# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Вопросы и ответы

1. **В какой стране Южной Америки можно встретить пингвинов?**  
   Ответ: Аргентина

2. **Что произойдет, если вы закричите в Антарктиде?**  
   Ответ: Эхо будет длиться минуту

3. **Какое государство в Африке является самым маленьким по площади?**  
   Ответ: Сейшельские Острова

4. **Кто был губернатором штата Калифорния в начале 2000-х?**  
   Ответ: Арнольд Шварцнеггер (также принимаются: Терминатор, Конан Варвар, Иван Данко)

5. **Какая основная цель традиции Naki Sumo в Японии?**  
   Ответ: Принести удачу и здоровье для детей

6. **Какая страна является родиной первого в мире университета, основанного в 1386 году?**  
   Ответ: Германия

7. **Как называется реальный город в Австралии, название которого переводится как "Не лезь, а то укушу"?**  
   Ответ: Уагуаг-Уагуаг

8. **Что можно сделать на большом барьерном рифе, доплыв до него на пароме?**  
   Ответ: Отправить родным открытку

9. **Янки и Дикси это:**  
   Ответ: Жители севера и юга США

10. **Что из этого НЕ рекомендуют делать туристам в Австралии?**  
    Ответ: Плавать в океане без колготок

11. **Что, согласно народной мудрости Эквадора, принесёт счастье и удачу?**  
    Ответ: Сделать селфи с кондором

12. **В какой из этих азиатских городов самый короткий прямой перелет из Москвы?**  
    Ответ: Гоа (Индия)

13. **Что общего между баобабом и верблюдом?**  
    Ответ: Делают запасы воды

14. **В какой стране Южной Америки можно попробовать мороженое из кактуса?**  
    Ответ: Перу

15. **Какой закон правда существует в США:**  
    Ответ: Все перечисленное (В Алабаме запрещено носить мороженое в заднем кармане; В Аризоне запрещено класть спать осла в ванной; В городе Мэнвилл в Нью-Джерси запрещено предлагать сигареты и алкоголь животным в зоопарке)