using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class nextLocation : MonoBehaviour
{
    public TMP_Text LocationName;
    QuestionData allData;
    // Start is called before the first frame update
    void Start()
    {
        allData = questions.allData;
        LocationName.text = allData.name;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void OpenGoogleMaps()
    { 
       
        
        string url = "https://www.google.com/maps?q=" + allData.lat + "," + allData.lng;

        // Open the URL
        Application.OpenURL(url);
    }
}
