## to crreate project:
uv init dev-vault
## to learn uv cmd:
https://realpython.com/python-uv/

python3 -m venv venv
wrtire code in main file
uvicorn main:app --reload


# Create the project using Vite
npm create vite@latest frontend -- --template react

# Move into the folder and install dependencies
cd frontend
npm install

2. Understanding the React File Structure
For now, you only need to care about the src/ directory.

main.jsx: The entry point. It's like your application.ex in Elixir; it starts the whole system.

App.jsx: This is your main "Component." You will write your UI code here today.

App.css: Where you can add styles (we'll keep it simple for now).


3. The React "Mental Model" vs. Elixir
In Elixir, data is immutable. In React, you use Hooks to manage data that changes:

useState: Think of this as a tiny, single-value GenServer state. It holds your list of notes.

useEffect: This is a "Side Effect" hook. You use it to tell React: "The moment you appear on the screen, go fetch data from my Python API."