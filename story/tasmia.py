# uncomment this file for minio
from minio import Minio

def uploadToMinio(img, imgname):
    client = Minio(
            "127.0.0.1:9000",
            # access_key="5FKL2Oi9r73na5Zw",
            # secret_key="rQCvlokefQknyxwwt0pu9j6qCMu7Vgml", # for labpc
            access_key="m0K5BCrF0lexkDdf",
            secret_key="5KuDBmEAuIYLQSCfHxAbeog6J72iubOQ",
            secure=False
        )

    # print("imageee:"+img)
    found = client.bucket_exists("imagebucket")
    if not found:
        client.make_bucket("imagebucket")
    else:
        print("Bucket 'imagebucket' already exists")

    # Upload '/home/user/Photos/asiaphotos.zip' as object name
    # 'asiaphotos-2015.zip' to bucket 'asiatrip'.
    client.put_object("imagebucket", imgname, img, -1, part_size=10000000, metadata={'content_type':'image'})
    print("Successfully uploaded")