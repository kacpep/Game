using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class FinishPage : MonoBehaviour
{
    // Start is called before the first frame update
    public TMP_Text score;
    void Start()
    {
        score.SetText("Score: " + PlayerPrefs.GetInt("score",9999));
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
