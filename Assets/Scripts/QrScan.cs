 using UnityEngine;
using UnityEngine.UI;
using ZXing;
using TMPro;
public class QRCodeScanner : MonoBehaviour
{
    public RawImage cameraDisplay; // Reference to the RawImage component for displaying the camera feed
    public TMP_Text IdText;



    private WebCamTexture webcamTexture;
    private BarcodeReader barcodeReader;



    void Start()
    {
        // Initialize the camera
        webcamTexture = new WebCamTexture();
        cameraDisplay.texture = webcamTexture; // Assign the webcam texture to the RawImage for display
        webcamTexture.Play();

        // Initialize the barcode reader
        barcodeReader = new BarcodeReader();
        
    }

    void Update()
    {
        // Check for QR codes in the camera feed
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
                     IdText.text = "Id: " + result.Text;
                    
                }
            }
            catch (System.Exception ex) { Debug.LogWarning(ex.Message); }
        }
    }
}