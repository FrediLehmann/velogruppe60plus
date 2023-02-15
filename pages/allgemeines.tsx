export const getServerSideProps = () => {
  return {
    redirect: {
      destination: '/info',
      permanent: true
    }
  };
};

const Information = () => {
  return <></>;
};

export default Information;
