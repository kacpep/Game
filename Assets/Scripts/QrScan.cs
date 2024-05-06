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

                if (result != null)
                {
                    // QR code detected, do something with the result
                    qrText = result.Text;
                    SceneManager.LoadScene("datatransform");

                }
            }
            catch (System.Exception ex) { Debug.LogWarning(ex.Message); }
        }
    }
}