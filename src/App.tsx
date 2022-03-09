import { useState } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import { TableHeader } from '../src/constants/table-header';

function App() {
  return <Layout TableHeader={TableHeader} />;
}

export default App;
