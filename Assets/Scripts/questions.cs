using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class questions : MonoBehaviour
{
    public TMP_Text test;
    // Start is called before the first frame update
    void Start()
    {
        test.text = QRCodeScanner.qrText;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
