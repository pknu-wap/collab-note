const HomePage = () => {
  const onClick = () => {
    window.location.href = 'http://localhost:8080/auth/github';
  };
  return (
    <div>
      <button onClick={onClick}>asdf</button>
    </div>
  );
};

export default HomePage;
