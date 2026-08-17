#include<bits/stdc++.h>
using namespace std;

int main(){
    int t;
    cin>>t;
    while(t--){
        int n;
        cin>>n;

        vector<int>arr(n);
        for(int i=0;i<n;i++){
            cin>>arr[i];
        }

        bool flag=false;

        for(int i=1;i<n-1 && !flag; i++){

            int left=-1;
            for(int j=0;j<i;j++){
                if(arr[j]<arr[i]){
                    left=j;
                    break;
                }
            }
            int right=-1;
            for(int k=i+1;k<n;k++){
                if(arr[k]<arr[i]){
                    right=k;
                    break;
                }
            }

            if(left!=-1 && right!=-1){
                cout<<"YES"<<endl;
                cout<<left+1<<" "<<i+1<<" "<<right+1<<endl;
                flag=true;
            }

        }

        if(!flag) cout<<"NO"<<endl;
    }
}