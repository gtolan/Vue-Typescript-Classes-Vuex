import { VuexModule, Module, Mutation } from "vuex-module-decorators";
@Module({ namespaced: true, name: 'ComponentsControls' }) ///namestapced true
class ComponentsControls extends VuexModule {

    public sendMessageModal = false;
    public sideNavOpen = false;
    public profileMenuOpen = false;
    public blogMenuOpen = false;
    public isOverlayActive = false;
    public isOverlaySoft = false;

    //mutations: {
    @Mutation
    public toggleSendMessage() {
        console.log("[STORE MUTATIONS] - toggleSendMessageModal", this.sendMessageModal);
        this.sendMessageModal = !this.sendMessageModal;
    }
    @Mutation
    toggleSideNavOpen() {
        console.log("[STORE MUTATIONS] - toggleSideNavOpen");
        // if(state.sideNavOpen){state.isOverlayActive = false}
        this.sideNavOpen = !this.sideNavOpen;
        console.log("sidenav toggled");
    }
    @Mutation
    toggleProfileMenu() {
        console.log("[STORE MUTATIONS] - toggleProfileMenu");
        this.profileMenuOpen = !this.profileMenuOpen;
        if (this.blogMenuOpen == true) { this.blogMenuOpen = false }

    }
    @Mutation
    toggleBlogMenuOpen() {
        console.log("[STORE MUTATIONS] - toggleBlogMenuOpen", this.profileMenuOpen);
        this.blogMenuOpen = !this.blogMenuOpen;
        if (this.profileMenuOpen == true) { this.profileMenuOpen = false }

    }
    @Mutation
    toggleOverlayOpen() {
        console.log("[STORE MUTATIONS] - toggleOverlayOpen", this.isOverlayActive);
        this.isOverlayActive = !this.isOverlayActive;
        console.log("[STORE MUTATIONS] - toggleOverlayOpen After", this.isOverlayActive);
    }

    @Mutation
    removeSoftOverlay() {
        console.log("[STORE MUTATIONS] - removeSoftOverlay");
        this.isOverlaySoft = false;
    }

    @Mutation
    addSoftOverlay() {
        console.log("[STORE MUTATIONS] - addSoftOverlay", this.isOverlaySoft);
        this.isOverlaySoft = true;
    }
    @Mutation
    overlayClicked() {
        console.log("[STORE MUTATIONS] - overlayClicked");
        this.sendMessageModal = false;
        this.sideNavOpen = false;
        this.profileMenuOpen = false;
        this.blogMenuOpen = false;
        this.isOverlayActive = false;
        this.isOverlaySoft = false;
    }


    //getters:{
    get isSideNavOpen() {
        return this.sideNavOpen;
    }

}

export default ComponentsControls;
