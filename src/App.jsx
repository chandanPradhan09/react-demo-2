import "./App.css";
import Button from "./components/Button";
import Toggle from "./components/Toggle";
import LiveMirror from "./components/LiveMirror";
import HoverBox from "./components/HoverBox";
import TodoList from "./components/TodoList";
import TrafficLight, { TrafficLightDemo } from "./components/TrafficLight";

function Section({ title, children }) {
    return (
        <section className="w-full max-w-6xl mx-auto py-4 px-4">
            <div
                className="
                    bg-white dark:bg-gray-800
                    rounded-2xl
                    shadow-sm hover:shadow-md
                    transition-all duration-300
                    border border-gray-200 dark:border-gray-700
                    p-6 md:p-10
                "
            >
                {/* Heading */}
                <div className="mb-8">
                    <h2
                        className="
                            text-2xl md:text-3xl font-bold
                            text-gray-800 dark:text-white
                            flex items-center gap-3
                        "
                    >
                        <span className="w-2 h-8 bg-blue-500 rounded-sm"></span>
                        {title}
                    </h2>
                </div>

                {/* Content */}
                <div
                    className="
                        flex flex-wrap
                        gap-6
                        justify-center items-center
                        bg-gray-50 dark:bg-gray-900
                        rounded-xl
                        p-6
                    "
                >
                    {children}
                </div>
            </div>
        </section>
    );
}

function App() {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Section title="Exercise 1: Buttons">
                <Button label="Primary" color="#185FA5" />
                <Button label="Danger" color="#A32D2D" />
                <Button label="Success" color="#1D9E75" />
                <Button label="Warning" color="#EF9F27" />
                <Button label="iServeU" color="#aaaaaa" />
            </Section>

            <Section title="Exercise 2: Toggle">
                <Toggle />
            </Section>

            <Section title="Exercise 3: Live Mirror">
                <LiveMirror />
            </Section>

            <Section title="Exercise 4: Hover Box">
                <HoverBox />
            </Section>

            <Section title="Exercise 5: Traffic Light">
                <TrafficLight color="green" />
                <TrafficLight color="yellow" />
                <TrafficLight color="red" />
            </Section>

            <Section title="Exercise 5.1: Traffic Light Demo">
                <TrafficLightDemo />
            </Section>

            <Section title="Exercise 6: Todo List">
                <TodoList />
            </Section>
        </div>
    );
}

export default App;
