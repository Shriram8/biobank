import React, { useEffect, useState } from "react";
import { RETRYATTEMPTS } from "../Constants/networkConstants";
import { useMutation } from "@apollo/client";

const NetworkComponent = ({props}: {props: any}) => {
  const [attempts, setAttempts] = useState(0);
  const [requestData, setRequestData] = useState(false);
  let [mutateFunction, { data, loading, error }] = useMutation(props.query, {
    onError: (error) => { },
    update: props.update,
  });
  if (data) {
  }
  const callQuery = () => {
    mutateFunction({
      variables: props.variables[0]
    });
  };

  useEffect(() => {
    if (requestData) {
      setAttempts(0);
      callQuery();
      setRequestData(false);
    }
  }, [requestData]);

  useEffect(() => {
    if (props.sendQuery) {
      setRequestData(props.sendQuery);
    }
  }, [props.sendQuery]);

  useEffect(() => {
    if (error) {
     
      if (attempts > RETRYATTEMPTS - 1) {
        props.callback(0, null);
      }
      setTimeout(function () {
        if (attempts < RETRYATTEMPTS) {
          setAttempts(attempts + 1);
          callQuery();
        }
      }, 1000);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      props.getData(data);
      props.callback(1, data);
      return;
    }
  }, [data]);

  return (
    <>
      {error && attempts > RETRYATTEMPTS - 1 ? (
        // <Text style={styles.Text}>Failed to enter details. Try again.</Text>
        null
      ) : (
        <></>
      )}
    </>
  );
};

export default NetworkComponent;