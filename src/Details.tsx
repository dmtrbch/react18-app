import { useParams, useNavigate } from "react-router-dom";
import { useState, lazy } from "react";
import { useDispatch } from "react-redux";
import { useGetPetQuery } from "./petApiService";
import { adopt } from "./adoptedPetSlice";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

const Modal = lazy(() => import("./Modal"));

const Details = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error(
      "why did you not give me an id?!!! I wanted an id. I have no id."
    );
  }

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { isLoading, data: pet } = useGetPetQuery(id);

  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🕤 </h2>
      </div>
    );
  }

  if (!pet) {
    throw new Error("no pet lol");
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      dispatch(adopt(pet));
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary() {
  // props will be only pass thorugh ErrorBoundary if there are any so we can use spread ...props
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

//export default function DetailsErrorBoundary(props) {
//  return (
//    <ErrorBoundary errorComponent={<h2>Blabla bla Error</h2>}>
//      <Details {...props} />
//    </ErrorBoundary>
//  );
//}
