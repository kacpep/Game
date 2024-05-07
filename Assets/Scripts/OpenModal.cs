using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;

public class OpenModal : MonoBehaviour
{
    // Start is called before the first frame update

    public GameObject modal;

    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
   public void Open(){
        modal.SetActive(true);
    }
    public void Close(){
        modal.SetActive(false);
    }
}
