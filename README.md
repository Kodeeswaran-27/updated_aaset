# Asset_Prediction
This repository holds the code for asset prediction project
#Prerequisites
install node js command prompt
Install npm into your system
run the command - npm install
now your project is ready to run in your system


  const handleDrop = (acceptedFiles) => {
    setLoading(true);
    setTimeout(async() => {
      try {
          const response = await axios.post('http://localhost:5000/train', acceptedFiles, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Data uploaded successfully:', response.data);
          navigate('/main/predictedData');
        } catch (error){
          console.error('Error uploading data:', error);
        }
      // processFiles(acceptedFiles);
    }, 5000);
  };
