 using UnityEngine;
using UnityEngine.UI;
using ZXing;
using TMPro;
using UnityEngine.SceneManagement;


public class QRCodeScanner : MonoBehaviour
{
    public RawImage cameraDisplay; // Reference to the RawImage component for displaying the camera feed
    public TMP_Text IdText;
  
    private WebCamTexture webcamTexture;
    private BarcodeReader barcodeReader;
    public static string qrText;
    public static QRCodeScanner Instance;


 

    void Start()
    {
        if(PlayerPrefs.GetInt("CurrentStatus", 0) == 0)
        {
            IdText.SetText("Looking for initial QR");
            IdText.fontSize = 13;
        }else{
            IdText.SetText("Looking for QR");
            IdText.fontSize = 20;
        }
       


        webcamTexture = new WebCamTexture();
        cameraDisplay.texture = webcamTexture; // Assign the webcam texture to the RawImage for display
        webcamTexture.Play();

        // Initialize the barcode reader
        barcodeReader = new BarcodeReader();



    }

    void Update()
    {

        if (webcamTexture.isPlaying)
        {
            try
            {
                // Decode the QR code
                Result result = null;
                var data = webcamTexture.GetPixels32();
                var width = webcamTexture.width;
                var height = webcamTexture.height;
                result = barcodeReader.Decode(data, width, height);

                if (result != null )
                {
                    qrText = result.Text;
                    
                    if (PlayerPrefs.GetInt("CurrentStatus", 0) == 0)
                    {
                         try{
                            InitialData initialData = GetComponent<generateQrToJson>().RefactorJsonInitial(qrText);
                            if(initialData == null){
                                SceneManager.LoadScene("Error Page");
                            }else{

                            PlayerPrefs.SetInt("CurrentStatus", 1);
                            SceneManager.LoadScene("nextLocationScene");
                            }
                         }catch{
                            Debug.Log("Error");
                            SceneManager.LoadScene("Error Page");
                        }
                  
                       
                    }
                    else
                    {
                       try{

                            QuestionData questionData = GetComponent<generateQrToJson>().RefactorJson(qrText);
                            if(questionData == null){
                                SceneManager.LoadScene("Error Page");
                            }else{
                                SceneManager.LoadScene("Question Page");
                            
                            }

                       }catch{
                            Debug.Log("Error");
                            SceneManager.LoadScene("Error Page");
                        }

                    }

                   



                }
            }
            catch (System.Exception ex) { Debug.LogWarning(ex.Message); }
        }
    }
}