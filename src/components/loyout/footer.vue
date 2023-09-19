<template>
    <div>
        <section class="contact-area" id="contact">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="contact-content text-center">
                        <div class="contact-social">
                            <ul>
                                <li><a class="hover-target" href=""><i class="bi bi-facebook"></i></a></li>
                                <li><a class="hover-target" href=""><i class="bi bi-youtube"></i></a></li>
                                <li><a class="hover-target" href=""><i class="bi bi-whatsapp"></i></a></li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- =============== 1.9 Contact Area End ====================-->
    <!-- =============== 1.9 Footer Area Start ====================-->
    <footer>
        <p>Copyright &copy; 2023 All Rights Reserved.</p>
    </footer>
    </div>
</template>

<script>
export default {
    name: 'ForumMffeFooter',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="css" scoped>


        section {
            padding: 30px 0;
           /* min-height: 100vh;*/
        }
 ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }
.contact-area {
    border-bottom: 1px solid #353C46;
}




.contact-social {
    margin-top: 30px;
}

.contact-social > ul {
    display: inline-flex;
}

.contact-social ul li a {
    border: 1px solid #8b9199;
    color: var(--text-color);
    display: inline-block;
    height: 40px;
    margin: 0 10px;
    padding-top: 7px;
    transition: all 0.4s ease 0s;
    width: 40px;
}

.contact-social ul li a:hover {
    border: 1px solid #FAB702;
    color: #FAB702;
}

.contact-content img {
    max-width: 210px;
}

section, footer {
    background: var(--blanc);
    color: var(--text-color);
}

footer p {
    padding: 40px 0;
    text-align: center;
}


</style>