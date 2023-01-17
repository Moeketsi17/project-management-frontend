import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existin, incoming){
            return incoming;
          }
        },
        Projects: {
          merge(existin, incoming){
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: "mongodb+srv://raymondl:raymondl1997@cluster0.bm3m04f.mongodb.net/management_db?retryWrites=true&w=majority",
  cache,
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/Projects/:id" element={<Project/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
