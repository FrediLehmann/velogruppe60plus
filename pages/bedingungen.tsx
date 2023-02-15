export const getServerSideProps = () => {
  return {
    redirect: {
      destination: '/info',
      permanent: true
    }
  };
};

const Conditions = () => {
  return <></>;
};

export default Conditions;
