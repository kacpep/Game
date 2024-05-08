using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class nextLocation : MonoBehaviour
{
    public TMP_Text LocationName;
    public TMP_Text label;

    // Start is called before the first frame update
    void Start()
    {
        if (PlayerPrefs.GetString("number","0") == "0")
        {
            label.SetText("Go to location");
        }
        LocationName.text = PlayerPrefs.GetString("name","error"); 
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void OpenGoogleMaps()
    { 
       
        
        string url = "https://www.google.com/maps?q=" + PlayerPrefs.GetString("lat", "error") + "," + PlayerPrefs.GetString("lng", "error");

        // Open the URL
        Application.OpenURL(url);
    }
}
