import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeRouter from './routes/homeRouter';
import SubjectsRouter from './routes/subjectRoutes';
import Menu from './components/menu';
import Footer from './components/footer';
import Header from './components/header';

function App() {
	return (
		<>
			<main>
				<Header />
				<Menu />
				<Routes>
					<Route path='/' element={<HomeRouter />} />
					<Route path='/subjects/:id' element={<SubjectsRouter />} />
				</Routes>
			</main>
			<Footer />
		</>
	)
}

export default App;