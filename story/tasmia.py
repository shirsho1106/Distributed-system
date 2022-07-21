from minio import Minio

def uploadToMinio(img):
    client = Minio(
            "127.0.0.1:9000",
            access_key="5FKL2Oi9r73na5Zw",
            secret_key="rQCvlokefQknyxwwt0pu9j6qCMu7Vgml",
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
    client.put_object("imagebucket", "banana" , img, -1, part_size=5243000)
    print("Successfully uploaded")